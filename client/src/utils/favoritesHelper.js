import { RESTAURANTS } from '@/data/restaurants';
import { MENU_ITEMS } from '@/data/menu';
import { getAllDishes } from '@/services/discoveryService';

/**
 * Resolves favorite restaurant IDs into full restaurant objects.
 * Safely ignores stale or invalid IDs.
 *
 * @param {Array<string>} favoriteIds
 * @returns {Array<Object>}
 */
export function getFavoriteRestaurants(favoriteIds) {
  if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) return [];
  return RESTAURANTS.filter((restaurant) => favoriteIds.includes(restaurant.id));
}

/**
 * Resolves favorite dish IDs into full enriched dish objects.
 * Safely ignores stale or invalid IDs.
 *
 * @param {Array<string>} favoriteIds
 * @returns {Array<Object>}
 */
export function getFavoriteDishes(favoriteIds) {
  if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) return [];
  const allEnrichedDishes = getAllDishes(MENU_ITEMS, RESTAURANTS);
  return allEnrichedDishes.filter((dish) => favoriteIds.includes(dish.id));
}
