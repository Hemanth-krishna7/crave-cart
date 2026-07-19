import { formatCurrency } from '@/utils';

export default function CheckoutSummary({ subtotal, deliveryFee, grandTotal, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading border-b border-slate-100 pb-3">
        Checkout Summary
      </h3>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-slate-600">
          <span>Order Subtotal</span>
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
          <span>Total Payable</span>
          <span className="font-mono text-orange-600">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
