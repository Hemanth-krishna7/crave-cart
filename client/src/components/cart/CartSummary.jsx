import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { APP_CONFIG } from '@/constants/app';

export default function CartSummary({ subtotal }) {
  const deliveryFee = APP_CONFIG.DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading border-b border-slate-100 pb-3">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800 font-mono">{formatCurrency(subtotal)}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center text-slate-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-800 font-mono">
            {formatCurrency(deliveryFee)}
          </span>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-base font-extrabold text-slate-900">
          <span>Grand Total</span>
          <span className="font-mono text-orange-650 text-orange-600">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Link
        to={ROUTES.CHECKOUT}
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Checkout All Restaurants
      </Link>
    </div>
  );
}
