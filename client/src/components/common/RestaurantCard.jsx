import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { RESTAURANT_FALLBACK_IMAGE } from '@/utils/imageFallbacks';

export default function RestaurantCard({ restaurant }) {
  const isClosed = restaurant.availabilityStatus === 'closed';
  const detailUrl = ROUTES.RESTAURANT_DETAIL.replace(':id', restaurant.id);

  const cardClasses = `block bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full transition duration-200 ${
    isClosed
      ? 'opacity-70'
      : 'hover:shadow-md hover:border-slate-300 hover:translate-y-[-2px]'
  }`;

  return (
    <Link to={detailUrl} className={cardClasses}>
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = RESTAURANT_FALLBACK_IMAGE;
          }}
        />

        {/* Closed Overlay */}
        {isClosed && (
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[0.5px] flex items-center justify-center">
            <span className="bg-slate-900/85 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-lg tracking-wider border border-slate-800 shadow-sm">
              Closed
            </span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-slate-100 z-10">
          <span className="text-amber-500 font-bold text-xs">★</span>
          <span className="text-xs font-bold text-slate-800">{restaurant.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 line-clamp-1">{restaurant.name}</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {restaurant.cuisine.join(', ')}
          </p>
        </div>

        {/* Footer info: Delivery Time & Price */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-slate-400"
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
          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {restaurant.priceCategory}
          </span>
        </div>
      </div>
    </Link>
  );
}
