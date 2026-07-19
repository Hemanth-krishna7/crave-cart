import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants/routes';

export default function RestaurantCartSection({
  restaurantId,
  restaurantName,
  items,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-5">
      {/* Restaurant Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="restaurant">
            🍴
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-800 font-heading">
            {restaurantName}
          </h3>
        </div>
        <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-100">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
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
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-3">
        <div className="text-sm font-semibold text-slate-500">
          <span>Section Subtotal: </span>
          <span className="font-bold text-slate-800 font-mono">{formatCurrency(subtotal)}</span>
        </div>
        <Link
          to={ROUTES.CHECKOUT_RESTAURANT.replace(':restaurantId', restaurantId)}
          className="px-4 py-1.5 text-xs font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white shadow-sm transition duration-200 focus:outline-none"
        >
          Checkout Restaurant
        </Link>
      </div>
    </div>
  );
}
