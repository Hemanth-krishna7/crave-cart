import { useParams } from 'react-router-dom';
import { formatCurrency } from '@/utils';
import { FOOD_FALLBACK_IMAGE } from '@/utils/imageFallbacks';
import { useCartStore, selectItemQuantity } from '@/store/cartStore';
import QuantitySelector from '@/components/common/QuantitySelector';
import FavoriteButton from '@/components/common/FavoriteButton';
import { canPlaceOrder } from '@/services/availabilityService';

export default function FoodCard({ item }) {
  const { name, description, price, isVeg, isPopular, rating, image } = item;
  const { id: routeRestaurantId } = useParams();

  const addItem = useCartStore((state) => state.addItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const quantity = useCartStore(selectItemQuantity(item.id));
  const isClosed = !canPlaceOrder(item.restaurantId || routeRestaurantId);

  const handleAddToCart = () => {
    if (isClosed) return;
    addItem({
      id: item.id,
      restaurantId: item.restaurantId || routeRestaurantId,
      name,
      image,
      price,
    });
  };

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-4 sm:p-5 flex gap-4 sm:gap-6 shadow-md hover:shadow-lg hover:border-orange-500/30 hover:-translate-y-0.5 transition duration-300 backdrop-blur-md">
      {/* 1:1 Food Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-slate-900 shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = FOOD_FALLBACK_IMAGE;
          }}
        />
        <FavoriteButton
          id={item.id}
          type="dish"
          name={name}
          className="absolute top-1.5 left-1.5 p-1 w-7.5 h-7.5"
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
                  ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                  : 'border-rose-500/30 text-rose-400 bg-rose-500/10'
              }`}
              aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}
              ></span>
            </span>

            {/* Popular Badge */}
            {isPopular && (
              <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-orange-500/20 flex items-center gap-0.5 uppercase tracking-wide">
                ★ Popular
              </span>
            )}

            {/* Rating */}
            {rating && (
              <span className="text-[10px] font-bold text-slate-300 bg-white/5 px-1.5 py-0.5 rounded">
                ★ {rating.toFixed(1)}
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-white leading-snug font-heading">
            {name}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* Price & Quantity Selector */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm sm:text-base font-extrabold text-orange-400 font-mono">
            {formatCurrency(price)}
          </span>
          {isClosed ? (
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg uppercase tracking-wider select-none">
              Unavailable
            </span>
          ) : (
            <QuantitySelector
              quantity={quantity}
              itemName={name}
              onAdd={handleAddToCart}
              onIncrease={() => increaseQuantity(item.id)}
              onDecrease={() => decreaseQuantity(item.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
