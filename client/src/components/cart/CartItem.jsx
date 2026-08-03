import { formatCurrency } from '@/utils';
import { FOOD_FALLBACK_IMAGE } from '@/utils/imageFallbacks';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { name, price, quantity, image } = item;

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-md backdrop-blur-md">
      {/* Left: Image & Name details */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = FOOD_FALLBACK_IMAGE;
            }}
          />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white leading-snug font-heading">
            {name}
          </h4>
          <p className="text-xs font-bold text-orange-400 font-mono mt-1">
            {formatCurrency(price)}
          </p>
        </div>
      </div>

      {/* Right: Quantity Toggles & Remove CTA */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center border border-white/5 rounded-lg bg-white/5 overflow-hidden">
          <button
            onClick={onDecrease}
            className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-bold focus:outline-none"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-1 text-sm font-bold text-slate-200 font-mono">{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-bold focus:outline-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Remove Trash Button */}
        <button
          onClick={onRemove}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all focus:outline-none"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
