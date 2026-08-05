import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants/routes';

export default function RestaurantCartSection({
  restaurantId,
  restaurantName,
  deliveryTime,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  meetsMinimum = true,
  minOrder = 0,
  remainingAmount = 0,
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 overflow-hidden shadow-md space-y-4 p-5 sm:p-6 backdrop-blur-md">
      {/* Restaurant Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl shrink-0">
            🍴
          </div>
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
              {restaurantName}
            </h3>
            {deliveryTime && (
              <p className="text-xs font-semibold text-orange-400 flex items-center gap-1">
                <span>⏱️</span>
                <span>Est. {deliveryTime}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-white/5 text-slate-350 text-xs font-bold px-3 py-1 rounded border border-white/10">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
          <span className="bg-orange-500/10 text-orange-400 text-xs font-extrabold px-3 py-1 rounded border border-orange-500/20 font-mono">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </div>

      {/* Minimum order requirement warning banner */}
      {!meetsMinimum && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-orange-950/10 border border-orange-500/15 rounded-xl text-xs text-slate-350">
          <div className="space-y-1">
            <p className="font-extrabold text-orange-450 flex items-center gap-1.5 text-[13px]">
              <span>⚠️</span> Minimum Order Value Required
            </p>
            <p className="leading-relaxed">
              Minimum order for {restaurantName} is <strong className="text-white font-mono">{formatCurrency(minOrder)}</strong>. Current subtotal is <strong className="text-white font-mono">{formatCurrency(subtotal)}</strong>.
            </p>
          </div>
          <div className="shrink-0 font-extrabold text-orange-450">
            Add {formatCurrency(remainingAmount)} more to order
          </div>
        </div>
      )}

      {/* Restaurant Subtotal and checkout CTA */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 gap-3">
        <div className="text-sm font-semibold text-slate-400">
          <span>Restaurant Subtotal: </span>
          <span className="font-bold text-white font-mono text-base">{formatCurrency(subtotal)}</span>
        </div>
        {meetsMinimum ? (
          <Link
            to={ROUTES.CHECKOUT_RESTAURANT.replace(':restaurantId', restaurantId)}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
          >
            Checkout Restaurant
          </Link>
        ) : (
          <Link
            to={ROUTES.RESTAURANT_DETAIL.replace(':id', restaurantId)}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-orange-650/30 text-orange-450 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition duration-200 focus:outline-none"
          >
            Add More Items
          </Link>
        )}
      </div>
    </div>
  );
}
