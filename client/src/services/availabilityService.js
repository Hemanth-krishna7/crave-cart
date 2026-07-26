import { RESTAURANTS } from '@/data/restaurants';
import { AVAILABILITY_STATUS } from '@/constants/restaurantAvailability';

/**
 * Normalizes restaurant availability properties into a standardized model object.
 *
 * @param {Object} restaurant - The restaurant data object.
 * @returns {Object} Normalized availability details containing status, messages, and order capabilities.
 */
export function getRestaurantAvailability(restaurant) {
  if (!restaurant) {
    return {
      status: AVAILABILITY_STATUS.CLOSED,
      message: 'Restaurant not found.',
      canOrder: false,
      canSchedule: false,
    };
  }

  const status = restaurant.availabilityStatus || restaurant.availability;

  if (status === AVAILABILITY_STATUS.OPEN) {
    return {
      status: AVAILABILITY_STATUS.OPEN,
      message: '',
      canOrder: true,
      canSchedule: false,
    };
  }

  if (status === AVAILABILITY_STATUS.SCHEDULED) {
    return {
      status: AVAILABILITY_STATUS.SCHEDULED,
      message: 'This restaurant is accepting pre-orders only.',
      canOrder: false,
      canSchedule: true,
    };
  }

  // Default to closed status
  return {
    status: AVAILABILITY_STATUS.CLOSED,
    message: 'This restaurant is currently closed.',
    canOrder: false,
    canSchedule: false,
  };
}

/**
 * Checks a restaurant's availability using its unique identifier.
 *
 * @param {string} restaurantId - The restaurant's ID.
 * @returns {Object} Standardized availability details.
 */
export function getRestaurantAvailabilityById(restaurantId) {
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  return getRestaurantAvailability(restaurant);
}

/**
 * Helper indicating if a restaurant is open to accept orders.
 *
 * @param {string} restaurantId - The restaurant's ID.
 * @returns {boolean} True if orders can be placed, otherwise false.
 */
export function canPlaceOrder(restaurantId) {
  const availability = getRestaurantAvailabilityById(restaurantId);
  return availability.canOrder;
}
