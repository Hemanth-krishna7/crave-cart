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
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
      {/* Restaurant Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl shrink-0">
            🍴
          </div>
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
              {restaurantName}
            </h3>
            {deliveryTime && (
              <p className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                <span>⏱️</span>
                <span>Est. {deliveryTime}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
          <span className="bg-orange-50 text-orange-800 text-xs font-extrabold px-3 py-1 rounded-full border border-orange-100 font-mono">
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

      {/* Restaurant Subtotal and checkout CTA */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-3">
        <div className="text-sm font-semibold text-slate-500">
          <span>Restaurant Subtotal: </span>
          <span className="font-bold text-slate-900 font-mono text-base">{formatCurrency(subtotal)}</span>
        </div>
        <Link
          to={ROUTES.CHECKOUT_RESTAURANT.replace(':restaurantId', restaurantId)}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Checkout Restaurant
        </Link>
      </div>
    </div>
  );
}
