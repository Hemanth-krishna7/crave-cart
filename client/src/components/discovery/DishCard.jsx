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
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md transition duration-200">
      {/* Top Image & Badge Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = FOOD_FALLBACK_IMAGE;
          }}
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-xs flex items-center gap-1.5 border border-slate-100 z-10">
          <span
            className={`w-3 h-3 rounded-full flex items-center justify-center border ${
              isVeg ? 'border-emerald-600 bg-emerald-50' : 'border-rose-600 bg-rose-50'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
            {isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Rating Badge */}
        {displayRating && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1 border border-slate-100 z-10">
            <span className="text-amber-500 font-bold text-xs">★</span>
            <span className="text-xs font-bold text-slate-800">{Number(displayRating).toFixed(1)}</span>
          </div>
        )}

        {/* Favorite Button */}
        <FavoriteButton
          id={id}
          type="dish"
          name={name}
          className="absolute bottom-3 right-3 shadow-md bg-white/95"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Cuisine Tags */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-600">
              {category || 'Dish'}
            </span>
            {Array.isArray(cuisine) && cuisine.length > 0 && (
              <span className="line-clamp-1">{cuisine.join(', ')}</span>
            )}
          </div>

          {/* Dish Title & Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1 font-heading">
              {name}
            </h3>
            <span className="text-sm font-extrabold text-orange-600 font-mono shrink-0">
              {formatCurrency(price)}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Parent Restaurant Info */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link
              to={detailUrl}
              className="font-bold text-slate-800 hover:text-orange-600 transition line-clamp-1"
            >
              🏢 {restaurantName}
            </Link>
            {deliveryTime && (
              <span className="shrink-0 font-semibold text-slate-600">
                ⏱️ {deliveryTime}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: View Restaurant & Inline Quantity Selector */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 items-center">
          <Link
            to={detailUrl}
            className="w-full text-center px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            View Restaurant
          </Link>
          <div className="flex justify-end w-full">
            {isClosed ? (
              <span className="w-full text-center px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold select-none uppercase tracking-wider">
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
