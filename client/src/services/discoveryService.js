import { getRestaurantAvailability } from '@/services/availabilityService';

/**
 * Extracts unique cuisine tags dynamically from the restaurant dataset.
 *
 * @param {Array} restaurants - List of restaurant objects.
 * @returns {Array<string>} Array of unique cuisine strings, beginning with 'All'.
 */
export function extractDynamicCuisines(restaurants = []) {
  const cuisineSet = new Set();
  restaurants.forEach((r) => {
    if (Array.isArray(r.cuisine)) {
      r.cuisine.forEach((c) => cuisineSet.add(c));
    }
  });
  return ['All', ...Array.from(cuisineSet).sort()];
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
      // Primary: Rating descending
      result = (b.rating || 0) - (a.rating || 0);
    } else if (sortKey === 'delivery') {
      // Primary: Delivery time ascending
      const timeA = parseMinDeliveryTime(a.deliveryTime);
      const timeB = parseMinDeliveryTime(b.deliveryTime);
      result = timeA - timeB;
    } else if (sortKey === 'name') {
      // Primary: Name ascending
      result = (a.name || '').localeCompare(b.name || '');
    }

    // Deterministic Secondary Tie-Breaker: Name ascending
    if (result === 0) {
      result = (a.name || '').localeCompare(b.name || '');
    }

    return result;
  });
}

/**
 * Master Discovery Pipeline executing search -> filter -> sort in a single pass.
 *
 * @param {Array} restaurants - Base restaurant dataset.
 * @param {Object} discoveryState - Discovery parameters.
 * @returns {Array} Final processed restaurant collection.
 */
export function applyRestaurantDiscovery(restaurants = [], discoveryState = {}) {
  const { searchQuery, selectedCuisine, selectedAvailability, selectedRating, selectedSort } = discoveryState;

  // Step 1: Search
  const searched = searchRestaurants(restaurants, searchQuery);

  // Step 2: Filters
  const filtered = filterRestaurants(searched, {
    selectedCuisine,
    selectedAvailability,
    selectedRating,
  });

  // Step 3: Sorting
  const sorted = sortRestaurants(filtered, selectedSort);

  return sorted;
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
