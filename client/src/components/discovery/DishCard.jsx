import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils';
import { FOOD_FALLBACK_IMAGE } from '@/utils/imageFallbacks';
import { ROUTES } from '@/constants/routes';
import { useCartStore, selectItemQuantity } from '@/store/cartStore';
import QuantitySelector from '@/components/common/QuantitySelector';
import FavoriteButton from '@/components/common/FavoriteButton';
import { canPlaceOrder } from '@/services/availabilityService';

export default function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const {
    id,
    name,
    description,
    price,
    isVeg,
    rating,
    category,
    image,
    restaurantId,
    restaurantName,
    restaurantRating,
    deliveryTime,
    cuisine,
  } = dish;

  const quantity = useCartStore(selectItemQuantity(id));
  const isClosed = !canPlaceOrder(restaurantId);

  const handleAddToCart = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isClosed) return;
    addItem({
      id,
      restaurantId,
      name,
      price,
      image,
    });
  };

  const displayRating = rating !== undefined ? rating : restaurantRating;
  const detailUrl = ROUTES.RESTAURANT_DETAIL.replace(':id', restaurantId);

  return (
    <div className="bg-neutral-900/60 hover:bg-neutral-900/90 rounded-xl border border-white/5 overflow-hidden flex flex-col h-full transition duration-300 shadow-md hover:shadow-lg hover:border-orange-500/30">
      {/* Top Image & Badge Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = FOOD_FALLBACK_IMAGE;
          }}
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 border border-white/5 z-10">
          <span
            className={`w-3 h-3 rounded-full flex items-center justify-center border ${
              isVeg ? 'border-emerald-600 bg-emerald-950/20' : 'border-rose-600 bg-rose-950/20'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
            {isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Rating Badge */}
        {displayRating && (
          <div className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-white/5 z-10">
            <span className="text-amber-500 font-bold text-xs">★</span>
            <span className="text-xs font-bold text-white">{Number(displayRating).toFixed(1)}</span>
          </div>
        )}

        {/* Favorite Button */}
        <FavoriteButton
          id={id}
          type="dish"
          name={name}
          className="absolute bottom-3 right-3 shadow-md bg-neutral-900/80"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Cuisine Tags */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="bg-white/5 px-2 py-0.5 rounded-md font-semibold text-slate-300">
              {category || 'Dish'}
            </span>
            {Array.isArray(cuisine) && cuisine.length > 0 && (
              <span className="line-clamp-1">{cuisine.join(', ')}</span>
            )}
          </div>

          {/* Dish Title & Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors duration-200 line-clamp-1">
              {name}
            </h3>
            <span className="text-sm font-extrabold text-orange-400 font-mono shrink-0">
              {formatCurrency(price)}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Parent Restaurant Info */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <Link
              to={detailUrl}
              className="font-bold text-slate-300 hover:text-orange-400 transition line-clamp-1"
            >
              🏢 {restaurantName}
            </Link>
            {deliveryTime && (
              <span className="shrink-0 font-semibold text-slate-400">
                ⏱️ {deliveryTime}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: View Restaurant & Inline Quantity Selector */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 items-center">
          <Link
            to={detailUrl}
            className="w-full text-center px-3 py-2.5 rounded-lg border border-white/10 text-slate-350 hover:bg-white/5 hover:text-white text-xs font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
          >
            View Restaurant
          </Link>
          <div className="flex justify-end w-full">
            {isClosed ? (
              <span className="w-full text-center px-3 py-2.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold select-none uppercase tracking-wider">
                Unavailable
              </span>
            ) : (
              <QuantitySelector
                quantity={quantity}
                itemName={name}
                onAdd={handleAddToCart}
                onIncrease={() => increaseQuantity(id)}
                onDecrease={() => decreaseQuantity(id)}
                className="w-full justify-between"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
