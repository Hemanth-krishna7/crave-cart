import { useParams } from 'react-router-dom';
import { formatCurrency } from '@/utils';
import { FOOD_FALLBACK_IMAGE } from '@/utils/imageFallbacks';
import { useCartStore } from '@/store/cartStore';

export default function FoodCard({ item }) {
  const { name, description, price, isVeg, isPopular, rating, image } = item;
  const { id: routeRestaurantId } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      restaurantId: item.restaurantId || routeRestaurantId,
      name,
      image,
      price,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex gap-4 sm:gap-6 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-200">
      {/* 1:1 Food Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = FOOD_FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* Details Container */}
      <div className="flex-grow flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Top tags: Veg/Non-Veg, Popular, Rating */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Veg / Non-Veg Indicator */}
            <span
              className={`inline-flex items-center justify-center border w-4 h-4 p-0.5 rounded ${
                isVeg
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                  : 'border-rose-500 text-rose-600 bg-rose-50'
              }`}
              aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}
              ></span>
            </span>

            {/* Popular Badge */}
            {isPopular && (
              <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-orange-100 flex items-center gap-0.5 uppercase tracking-wide">
                ★ Popular
              </span>
            )}

            {/* Rating */}
            {rating && (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                ★ {rating.toFixed(1)}
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-heading">
            {name}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* Price & Add Action */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
            {formatCurrency(price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-1.5 text-xs font-bold rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-colors shadow-sm focus:outline-none"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
