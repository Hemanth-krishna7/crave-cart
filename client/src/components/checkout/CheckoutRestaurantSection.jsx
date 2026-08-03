import { formatCurrency } from '@/utils';
import { FOOD_FALLBACK_IMAGE } from '@/utils/imageFallbacks';

export default function CheckoutRestaurantSection({ restaurantName, items }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 overflow-hidden shadow-md p-5 space-y-4 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="text-xl" role="img" aria-label="restaurant">
          🍴
        </span>
        <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
          {restaurantName}
        </h3>
      </div>

      {/* Items Read-only list */}
      <div className="divide-y divide-white/5">
        {items.map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = FOOD_FALLBACK_IMAGE;
                  }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-snug">{item.name}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-semibold text-slate-400 mr-4 font-mono">
                x {item.quantity}
              </span>
              <span className="text-sm font-bold text-slate-200 font-mono">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center pt-3 border-t border-white/5 text-sm font-semibold text-slate-400">
        <span>Section Subtotal</span>
        <span className="font-bold text-white font-mono">{formatCurrency(subtotal)}</span>
      </div>
    </div>
  );
}
