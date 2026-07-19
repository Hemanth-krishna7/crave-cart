import { RESTAURANTS } from '@/data/restaurants';

/**
 * Groups cart items by their restaurantId in a single pass.
 * Resolves the restaurant metadata from the local dataset once per section.
 *
 * @param {Array} cartItems - Flat list of cart items from store
 * @returns {Array} List of grouped restaurant structures: { restaurantId, restaurant, items }
 */
export function groupCartItemsByRestaurant(cartItems) {
  const groups = [];
  const indexMap = {};

  cartItems.forEach((item) => {
    const restId = item.restaurantId;
    if (indexMap[restId] === undefined) {
      indexMap[restId] = groups.length;
      const restaurant = RESTAURANTS.find((r) => r.id === restId) || null;
      groups.push({
        restaurantId: restId,
        restaurant,
        items: [item],
      });
    } else {
      groups[indexMap[restId]].items.push(item);
    }
  });

  return groups;
}
