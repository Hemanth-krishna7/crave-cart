import { ORDER_STATUS } from '@/constants/orderStatus';
import { APP_CONFIG } from '@/constants/app';

/**
 * Builds a standardized Order object.
 * Responsible only for structural object construction.
 *
 * @param {Object} params
 * @param {string} params.orderReference - Generated reference ID
 * @param {Object} params.restaurant - { id, name, image }
 * @param {Array} params.items - Snapshotted cart items list
 * @param {Object} params.pricing - Pre-calculated { subtotal, deliveryFee, total }
 * @param {Object} params.formData - Delivery form fields
 * @param {string} params.paymentMethod - Selected payment method
 * @returns {Object} Completed Order object
 */
export function buildOrder({
  orderReference,
  restaurant,
  items,
  pricing,
  formData,
  paymentMethod,
}) {
  return {
    id: orderReference,
    type: 'delivery',
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image,
    },
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    pricing: {
      subtotal: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      total: pricing.total,
    },
    deliveryInfo: {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      addressLine: formData.addressLine,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    },
    instructions: formData.instructions || '',
    payment: {
      method: paymentMethod,
      status: paymentMethod === 'cod' ? 'Pending' : 'Completed',
    },
    status: ORDER_STATUS.PREPARING,
    createdAt: new Date().toISOString(),
    estimatedDeliveryTime: APP_CONFIG.DEFAULT_DELIVERY_TIME,
  };
}
