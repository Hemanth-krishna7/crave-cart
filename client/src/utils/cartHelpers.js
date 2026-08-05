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

/**
 * Validates minimum order requirements for all restaurants represented in the cart.
 *
 * @param {Array} cartItems - Flat list of cart items from store
 * @returns {Object} { validations: Array, allMeetMinimum: boolean }
 */
export function validateMinimumOrder(cartItems) {
  const groups = groupCartItemsByRestaurant(cartItems);
  let allMeetMinimum = true;

  const validations = groups.map((group) => {
    const minOrder = group.restaurant?.minOrder || 0;
    const subtotal = group.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const meetsMinimum = subtotal >= minOrder;
    if (!meetsMinimum) {
      allMeetMinimum = false;
    }
    const remainingAmount = meetsMinimum ? 0 : Math.max(0, minOrder - subtotal);

    return {
      restaurantId: group.restaurantId,
      restaurantName: group.restaurant ? group.restaurant.name : 'Restaurant',
      restaurant: group.restaurant,
      subtotal,
      minOrder,
      remainingAmount,
      meetsMinimum,
    };
  });

  return {
    validations,
    allMeetMinimum,
  };
}
