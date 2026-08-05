import { useOrderStore } from '@/store/orderStore';
import { useCartStore } from '@/store/cartStore';
import { buildOrder } from '@/utils/orderBuilder';
import { generateOrderReference } from '@/utils/orderReference';
import { RESTAURANTS } from '@/data/restaurants';
import { canPlaceOrder } from '@/services/availabilityService';

/**
 * Orchestrates the complete order placement workflow.
 * Decouples React pages from direct store manipulations.
 *
 * @param {Object} params
 * @param {Array} params.cartItems - Flat items list from cart store
 * @param {Object} params.formData - Delivery form details
 * @param {string} [params.restaurantId] - Selected restaurant ID (if in single checkout mode)
 * @param {Object} params.pricing - Pre-calculated { subtotal, deliveryFee, total }
 * @returns {Object} The created Order object
 */
export function placeOrder({ cartItems, formData, restaurantId, pricing }) {
  // 1. Filter purchased items according to checkout mode
  const purchasedItems = restaurantId
    ? cartItems.filter((item) => item.restaurantId === restaurantId)
    : cartItems;

  if (purchasedItems.length === 0) {
    throw new Error('No items available for order placement.');
  }

  // 1.5 Enforce business validation of restaurant availability
  const uniqueRestaurantIds = [...new Set(purchasedItems.map((item) => item.restaurantId))];
  for (const id of uniqueRestaurantIds) {
    if (!canPlaceOrder(id)) {
      throw new Error('Cannot place order: One or more restaurants in your order are currently closed.');
    }
  }

  // 1.6 Enforce business validation of minimum order requirements
  for (const id of uniqueRestaurantIds) {
    const restaurant = RESTAURANTS.find((r) => r.id === id);
    const minOrder = restaurant?.minOrder || 0;
    const restaurantSubtotal = purchasedItems
      .filter((item) => item.restaurantId === id)
      .reduce((sum, item) => sum + item.quantity * item.price, 0);

    if (restaurantSubtotal < minOrder) {
      throw new Error(`Cannot place order: Subtotal for "${restaurant?.name || 'restaurant'}" is below the minimum order of ₹${minOrder}.`);
    }
  }

  // 2. Generate temporary order reference
  const orderReference = generateOrderReference();

  // 3. Resolve restaurant metadata
  let resolvedRestaurant = {
    id: 'multiple',
    name: 'Multiple Restaurants',
    image: '',
  };

  if (restaurantId) {
    const matched = RESTAURANTS.find((r) => r.id === restaurantId);
    if (matched) {
      resolvedRestaurant = {
        id: restaurantId,
        name: matched.name,
        image: matched.image,
      };
    }
  } else {
    // If multiple restaurants, resolve the first restaurant's image as a display option
    const firstMatched = RESTAURANTS.find((r) => r.id === purchasedItems[0]?.restaurantId);
    if (firstMatched) {
      resolvedRestaurant.image = firstMatched.image;
    }
  }

  // 4. Delegate construction to Order Builder
  const newOrder = buildOrder({
    orderReference,
    restaurant: resolvedRestaurant,
    items: purchasedItems,
    pricing,
    formData,
    paymentMethod: formData.paymentMethod,
  });

  // 5. Store order in Zustand Order Store
  useOrderStore.getState().createOrder(newOrder);

  // 6. Execute Cart cleanup
  if (restaurantId) {
    useCartStore.getState().removeRestaurantItems(restaurantId);
  } else {
    useCartStore.getState().clearCart();
  }

  // 7. Return created order details
  return newOrder;
}
