import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { RESTAURANT_FALLBACK_IMAGE } from '@/utils/imageFallbacks';
import { getRestaurantAvailability } from '@/services/availabilityService';
import RestaurantAvailabilityBadge from '@/components/restaurants/RestaurantAvailabilityBadge';

export default function RestaurantHeader({ restaurant }) {
  const isClosed = !getRestaurantAvailability(restaurant).canOrder;

  return (
    <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Cover Banner */}
      <div className="relative h-60 sm:h-72 w-full bg-slate-100">
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
          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-slate-900/90 text-white font-extrabold text-sm uppercase px-4 py-2 rounded-xl tracking-widest border border-slate-800 shadow-md">
              Closed
            </span>
          </div>
        )}

        {/* Back Button Floating on top-left of banner */}
        <Link
          to={ROUTES.RESTAURANTS}
          className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur text-sm font-semibold text-slate-700 hover:text-orange-600 shadow border border-slate-200 transition z-20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Details Container */}
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                {restaurant.name}
              </h1>
              {/* Centralized Availability Badge */}
              <RestaurantAvailabilityBadge restaurant={restaurant} />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {restaurant.cuisine.join(' • ')}
            </p>
          </div>

          {/* Core Info Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-center shadow-sm">
              <span className="block text-xs font-bold text-amber-500 leading-none">
                ★ {restaurant.rating.toFixed(1)}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Rating</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-center shadow-sm">
              <span className="block text-xs font-bold text-slate-700 leading-none">
                {restaurant.deliveryTime}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Delivery</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-center shadow-sm">
              <span className="block text-xs font-bold text-slate-700 leading-none">
                {restaurant.priceCategory}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Pricing</span>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {restaurant.description || `Experience the finest flavors of ${restaurant.cuisine.join(' and ')} cuisines. Prepared with fresh local ingredients by professional chefs and delivered straight to your table.`}
        </p>
      </div>
    </div>
  );
}
