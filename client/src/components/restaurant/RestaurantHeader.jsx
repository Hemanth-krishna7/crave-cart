import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { RESTAURANT_FALLBACK_IMAGE } from '@/utils/imageFallbacks';
import { getRestaurantAvailability } from '@/services/availabilityService';
import RestaurantAvailabilityBadge from '@/components/restaurants/RestaurantAvailabilityBadge';
import FavoriteButton from '@/components/common/FavoriteButton';

export default function RestaurantHeader({ restaurant }) {
  const isClosed = !getRestaurantAvailability(restaurant).canOrder;

  return (
    <div className="relative bg-neutral-900/60 rounded-xl border border-white/5 overflow-hidden shadow-lg backdrop-blur-md">
      {/* Cover Banner */}
      <div className="relative h-60 sm:h-72 w-full bg-neutral-950">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = RESTAURANT_FALLBACK_IMAGE;
          }}
        />
        {isClosed && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-950/90 text-red-300 font-extrabold text-xs uppercase px-4 py-2 rounded-lg tracking-widest border border-red-500/20 shadow-md">
              Closed
            </span>
          </div>
        )}

        {/* Back Button Floating on top-left of banner */}
        <Link
          to={ROUTES.RESTAURANTS}
          className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/80 backdrop-blur text-sm font-semibold text-slate-200 hover:text-white shadow border border-white/10 transition z-20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Favorite Button Floating on top-right of banner */}
        <FavoriteButton
          id={restaurant.id}
          type="restaurant"
          name={restaurant.name}
          className="absolute top-4 right-4 shadow-md bg-neutral-900/80 border border-white/10"
        />
      </div>

      {/* Details Container */}
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                {restaurant.name}
              </h1>
              {/* Centralized Availability Badge */}
              <RestaurantAvailabilityBadge restaurant={restaurant} />
            </div>
            <p className="text-sm text-slate-400 font-medium">
              {restaurant.cuisine.join(' • ')}
            </p>
          </div>

          {/* Core Info Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-center shadow-md">
              <span className="block text-xs font-bold text-amber-500 leading-none">
                ★ {restaurant.rating.toFixed(1)}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Rating</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-center shadow-md">
              <span className="block text-xs font-bold text-slate-200 leading-none">
                {restaurant.deliveryTime}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Delivery</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-center shadow-md">
              <span className="block text-xs font-bold text-slate-200 leading-none">
                {restaurant.priceCategory}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Pricing</span>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {restaurant.description || `Experience the finest flavors of ${restaurant.cuisine.join(' and ')} cuisines. Prepared with fresh local ingredients by professional chefs and delivered straight to your table.`}
        </p>
      </div>
    </div>
  );
}
