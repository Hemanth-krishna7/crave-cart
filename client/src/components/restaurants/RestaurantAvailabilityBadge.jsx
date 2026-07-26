import { getRestaurantAvailability } from '@/services/availabilityService';
import { AVAILABILITY_STATUS } from '@/constants/restaurantAvailability';

export default function RestaurantAvailabilityBadge({ restaurant, className = '' }) {
  const availability = getRestaurantAvailability(restaurant);

  let badgeStyles = 'bg-slate-50 text-slate-700 border-slate-200';
  if (availability.status === AVAILABILITY_STATUS.OPEN) {
    badgeStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (availability.status === AVAILABILITY_STATUS.CLOSED) {
    badgeStyles = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (availability.status === AVAILABILITY_STATUS.SCHEDULED) {
    badgeStyles = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${badgeStyles} ${className}`}
    >
      {availability.status}
    </span>
  );
}
