import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { APP_CONFIG } from '@/constants/app';

export default function CartSummary({ subtotal }) {
  const deliveryFee = APP_CONFIG.DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-6 shadow-lg space-y-6 backdrop-blur-md">
      <h3 className="text-lg font-bold text-white tracking-tight font-heading border-b border-white/5 pb-3">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-slate-400">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-200 font-mono">{formatCurrency(subtotal)}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center text-slate-400">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-200 font-mono">
            {formatCurrency(deliveryFee)}
          </span>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-3 border-t border-white/5 text-base font-extrabold text-white">
          <span>Grand Total</span>
          <span className="font-mono text-orange-400 font-extrabold">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Link
        to={ROUTES.CHECKOUT}
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
      >
        Checkout All Restaurants
      </Link>
    </div>
  );
}
