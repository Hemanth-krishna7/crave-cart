import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { RESTAURANT_FALLBACK_IMAGE } from '@/utils/imageFallbacks';
import { getRestaurantAvailability } from '@/services/availabilityService';
import FavoriteButton from '@/components/common/FavoriteButton';

export default function RestaurantCard({ restaurant }) {
  const isClosed = !getRestaurantAvailability(restaurant).canOrder;
  const detailUrl = ROUTES.RESTAURANT_DETAIL.replace(':id', restaurant.id);

  const cardClasses = `block bg-neutral-900/60 hover:bg-neutral-900/90 rounded-xl border border-white/5 overflow-hidden flex flex-col h-full transition duration-300 shadow-md ${
    isClosed
      ? 'opacity-65'
      : 'hover:shadow-lg hover:border-orange-500/30 hover:translate-y-[-2px]'
  }`;

  return (
    <Link to={detailUrl} className={cardClasses}>
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = RESTAURANT_FALLBACK_IMAGE;
          }}
        />

        {/* Favorite Button */}
        <FavoriteButton
          id={restaurant.id}
          type="restaurant"
          name={restaurant.name}
          className="absolute top-3 left-3 shadow-md"
        />

        {/* Closed Overlay */}
        {isClosed && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] flex items-center justify-center">
            <span className="bg-red-950/85 text-red-300 font-extrabold text-xs uppercase px-3 py-1.5 rounded-lg tracking-wider border border-red-500/20 shadow-md">
              Closed
            </span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-white/5 z-10">
          <span className="text-amber-500 font-bold text-xs">★</span>
          <span className="text-xs font-bold text-white">{restaurant.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors duration-200 line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {restaurant.cuisine.join(', ')}
          </p>
        </div>

        {/* Footer info: Delivery Time & Price */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {restaurant.deliveryTime}
          </span>
          <span className="font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md">
            {restaurant.priceCategory}
          </span>
        </div>
      </div>
    </Link>
  );
}
