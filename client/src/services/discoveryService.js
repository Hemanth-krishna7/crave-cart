import { getRestaurantAvailability } from '@/services/availabilityService';
import { MENU_ITEMS } from '@/data/menu';
import { RESTAURANTS } from '@/data/restaurants';

/**
 * Extracts unique cuisine tags dynamically from the restaurant dataset.
 *
 * @param {Array} restaurants - List of restaurant objects.
 * @returns {Array<string>} Array of unique cuisine strings, beginning with 'All'.
 */
export function extractDynamicCuisines(restaurants = RESTAURANTS) {
  const cuisineSet = new Set();
  restaurants.forEach((r) => {
    if (Array.isArray(r.cuisine)) {
      r.cuisine.forEach((c) => cuisineSet.add(c));
    }
  });
  return ['All', ...Array.from(cuisineSet).sort()];
}

/**
 * Flattens menu items across all restaurants into a single unified array of enriched dish objects.
 *
 * @param {Object} menuItemsMap - Object mapping restaurant IDs to dish arrays.
 * @param {Array} restaurantsList - Array of restaurant metadata.
 * @returns {Array<Object>} List of enriched dish items with restaurant details.
 */
export function getAllDishes(menuItemsMap = MENU_ITEMS, restaurantsList = RESTAURANTS) {
  const dishes = [];
  Object.keys(menuItemsMap).forEach((resId) => {
    const restaurant = restaurantsList.find((r) => r.id === resId);
    if (restaurant) {
      const items = menuItemsMap[resId] || [];
      items.forEach((item) => {
        dishes.push({
          ...item,
          restaurantId: resId,
          restaurantName: restaurant.name,
          restaurantRating: restaurant.rating,
          deliveryTime: restaurant.deliveryTime,
          cuisine: restaurant.cuisine,
          availabilityStatus: restaurant.availabilityStatus,
        });
      });
    }
  });
  return dishes;
}

/**
 * Searches restaurants by query string across name, cuisine, and description.
 *
 * @param {Array} restaurants - Input restaurant array.
 * @param {string} query - Raw search query.
 * @returns {Array} Filtered list matching search term.
 */
export function searchRestaurants(restaurants = [], query = '') {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return restaurants;

  return restaurants.filter((r) => {
    const nameMatch = r.name && r.name.toLowerCase().includes(trimmed);
    const descMatch = r.description && r.description.toLowerCase().includes(trimmed);
    const cuisineMatch =
      Array.isArray(r.cuisine) &&
      r.cuisine.some((c) => c.toLowerCase().includes(trimmed));

    return nameMatch || descMatch || cuisineMatch;
  });
}

/**
 * Searches dishes by query string across dish name, category, description, restaurant name, and cuisine.
 *
 * @param {Array} dishes - Input dish array.
 * @param {string} query - Raw search query.
 * @returns {Array} Filtered list matching search term.
 */
export function searchDishes(dishes = [], query = '') {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return dishes;

  return dishes.filter((d) => {
    const nameMatch = d.name && d.name.toLowerCase().includes(trimmed);
    const catMatch = d.category && d.category.toLowerCase().includes(trimmed);
    const descMatch = d.description && d.description.toLowerCase().includes(trimmed);
    const restMatch = d.restaurantName && d.restaurantName.toLowerCase().includes(trimmed);
    const cuisineMatch =
      Array.isArray(d.cuisine) &&
      d.cuisine.some((c) => c.toLowerCase().includes(trimmed));

    return nameMatch || catMatch || descMatch || restMatch || cuisineMatch;
  });
}

/**
 * Filters restaurants by availability, cuisine, and minimum rating.
 *
 * @param {Array} restaurants - Input restaurant array.
 * @param {Object} filters - Filter criteria { cuisine, availability, rating }.
 * @returns {Array} Filtered list.
 */
export function filterRestaurants(restaurants = [], filters = {}) {
  const { selectedCuisine = 'All', selectedAvailability = 'all', selectedRating = 'all' } = filters;

  return restaurants.filter((r) => {
    // 1. Cuisine Filter
    if (selectedCuisine !== 'All') {
      const hasCuisine = Array.isArray(r.cuisine) && r.cuisine.includes(selectedCuisine);
      if (!hasCuisine) return false;
    }

    // 2. Availability Filter
    if (selectedAvailability !== 'all') {
      const isCanOrder = getRestaurantAvailability(r).canOrder;
      if (selectedAvailability === 'open' && !isCanOrder) return false;
      if (selectedAvailability === 'closed' && isCanOrder) return false;
    }

    // 3. Rating Filter
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      if (!isNaN(minRating) && r.rating < minRating) return false;
    }

    return true;
  });
}

/**
 * Filters dishes by availability, cuisine, and minimum rating.
 *
 * @param {Array} dishes - Input dish array.
 * @param {Object} filters - Filter criteria { cuisine, availability, rating }.
 * @returns {Array} Filtered list.
 */
export function filterDishes(dishes = [], filters = {}) {
  const { selectedCuisine = 'All', selectedAvailability = 'all', selectedRating = 'all' } = filters;

  return dishes.filter((d) => {
    // 1. Cuisine Filter (match parent cuisine array or dish category)
    if (selectedCuisine !== 'All') {
      const hasCuisine = Array.isArray(d.cuisine) && d.cuisine.includes(selectedCuisine);
      const hasCategory = d.category && d.category.toLowerCase() === selectedCuisine.toLowerCase();
      if (!hasCuisine && !hasCategory) return false;
    }

    // 2. Availability Filter (check parent restaurant availability)
    if (selectedAvailability !== 'all') {
      const isCanOrder = getRestaurantAvailability({ availabilityStatus: d.availabilityStatus }).canOrder;
      if (selectedAvailability === 'open' && !isCanOrder) return false;
      if (selectedAvailability === 'closed' && isCanOrder) return false;
    }

    // 3. Rating Filter (check dish rating or restaurant rating)
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      const ratingToUse = d.rating !== undefined ? d.rating : d.restaurantRating;
      if (!isNaN(minRating) && ratingToUse < minRating) return false;
    }

    return true;
  });
}

/**
 * Helper to parse minimum delivery time from strings like "15-25 mins" -> 15
 */
function parseMinDeliveryTime(deliveryTimeStr = '') {
  const match = deliveryTimeStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 999;
}

/**
 * Sorts restaurants using stable sorting algorithms with deterministic name tie-breakers.
 *
 * @param {Array} restaurants - Input restaurant array.
 * @param {string} sortKey - Sorting option key.
 * @returns {Array} Sorted list.
 */
export function sortRestaurants(restaurants = [], sortKey = 'popular') {
  const list = [...restaurants];

  return list.sort((a, b) => {
    let result = 0;

    if (sortKey === 'popular' || sortKey === 'rating') {
      result = (b.rating || 0) - (a.rating || 0);
    } else if (sortKey === 'delivery') {
      const timeA = parseMinDeliveryTime(a.deliveryTime);
      const timeB = parseMinDeliveryTime(b.deliveryTime);
      result = timeA - timeB;
    } else if (sortKey === 'name') {
      result = (a.name || '').localeCompare(b.name || '');
    }

    if (result === 0) {
      result = (a.name || '').localeCompare(b.name || '');
    }

    return result;
  });
}

/**
 * Sorts dishes using stable sorting algorithms with deterministic name tie-breakers.
 *
 * @param {Array} dishes - Input dish array.
 * @param {string} sortKey - Sorting option key.
 * @returns {Array} Sorted list.
 */
export function sortDishes(dishes = [], sortKey = 'popular') {
  const list = [...dishes];

  return list.sort((a, b) => {
    let result = 0;

    if (sortKey === 'popular' || sortKey === 'rating') {
      result = (b.rating || 0) - (a.rating || 0);
    } else if (sortKey === 'delivery') {
      const timeA = parseMinDeliveryTime(a.deliveryTime);
      const timeB = parseMinDeliveryTime(b.deliveryTime);
      result = timeA - timeB;
    } else if (sortKey === 'name') {
      result = (a.name || '').localeCompare(b.name || '');
    }

    if (result === 0) {
      result = (a.name || '').localeCompare(b.name || '');
    }

    return result;
  });
}

/**
 * Discovery Pipeline for Restaurants: Search -> Filter -> Sort.
 */
export function applyRestaurantDiscovery(restaurants = [], discoveryState = {}) {
  const { searchQuery, selectedCuisine, selectedAvailability, selectedRating, selectedSort } = discoveryState;

  const searched = searchRestaurants(restaurants, searchQuery);
  const filtered = filterRestaurants(searched, {
    selectedCuisine,
    selectedAvailability,
    selectedRating,
  });
  const sorted = sortRestaurants(filtered, selectedSort);

  return sorted;
}

/**
 * Discovery Pipeline for Dishes: Search -> Filter -> Sort.
 */
export function applyDishDiscovery(dishes = [], discoveryState = {}) {
  const { searchQuery, selectedCuisine, selectedAvailability, selectedRating, selectedSort } = discoveryState;

  const searched = searchDishes(dishes, searchQuery);
  const filtered = filterDishes(searched, {
    selectedCuisine,
    selectedAvailability,
    selectedRating,
  });
  const sorted = sortDishes(filtered, selectedSort);

  return sorted;
}

/**
 * Master Unified Discovery Pipeline supporting both Restaurants and Dishes modes.
 *
 * @param {Array} restaurants - List of restaurants.
 * @param {Object} menuItemsMap - Map of menu items.
 * @param {Object} discoveryState - Discovery parameters including discoveryMode.
 * @returns {Array} Processed collection (either restaurants or dishes).
 */
export function applyUnifiedDiscovery(restaurants = RESTAURANTS, menuItemsMap = MENU_ITEMS, discoveryState = {}) {
  const mode = discoveryState.discoveryMode || 'restaurants';

  if (mode === 'dishes') {
    const allDishes = getAllDishes(menuItemsMap, restaurants);
    return applyDishDiscovery(allDishes, discoveryState);
  }

  return applyRestaurantDiscovery(restaurants, discoveryState);
}

/**
 * Derives active filter chip objects from the current discovery state.
 *
 * @param {Object} discoveryState - Discovery parameters.
 * @returns {Array<Object>} List of active chip metadata objects.
 */
export function getDerivedFilterChips(discoveryState = {}) {
  const chips = [];
  const { searchQuery, selectedCuisine, selectedAvailability, selectedRating } = discoveryState;

  if (searchQuery && searchQuery.trim()) {
    chips.push({
      id: 'searchQuery',
      key: 'searchQuery',
      label: `Search: "${searchQuery.trim()}"`,
    });
  }

  if (selectedCuisine && selectedCuisine !== 'All') {
    chips.push({
      id: 'selectedCuisine',
      key: 'selectedCuisine',
      label: `Cuisine: ${selectedCuisine}`,
    });
  }

  if (selectedAvailability && selectedAvailability !== 'all') {
    const availLabel = selectedAvailability === 'open' ? 'Open Now' : 'Closed';
    chips.push({
      id: 'selectedAvailability',
      key: 'selectedAvailability',
      label: `Status: ${availLabel}`,
    });
  }

  if (selectedRating && selectedRating !== 'all') {
    chips.push({
      id: 'selectedRating',
      key: 'selectedRating',
      label: `Rating: ${selectedRating}+ ★`,
    });
  }

  return chips;
}
