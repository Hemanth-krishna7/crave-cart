import { formatCurrency } from '@/utils';

export default function CheckoutSummary({ subtotal, deliveryFee, grandTotal, children }) {
  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-6 shadow-lg space-y-6 backdrop-blur-md">
      <h3 className="text-lg font-bold text-white tracking-tight font-heading border-b border-white/5 pb-3">
        Checkout Summary
      </h3>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-slate-400">
          <span>Order Subtotal</span>
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
          <span>Total Payable</span>
          <span className="font-mono text-orange-400 font-extrabold">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
