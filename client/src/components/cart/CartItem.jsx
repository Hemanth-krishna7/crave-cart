import { formatCurrency } from '@/utils';
import { FOOD_FALLBACK_IMAGE } from '@/utils/imageFallbacks';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { name, price, quantity, image } = item;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm">
      {/* Left: Image & Name details */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
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
          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-heading">
            {name}
          </h4>
          <p className="text-xs font-semibold text-slate-900 font-mono mt-1">
            {formatCurrency(price)}
          </p>
        </div>
      </div>

      {/* Right: Quantity Toggles & Remove CTA */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
          <button
            onClick={onDecrease}
            className="px-3 py-1.5 text-slate-500 hover:text-orange-600 hover:bg-slate-100 transition-colors font-bold focus:outline-none"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-1 text-sm font-bold text-slate-800 font-mono">{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-3 py-1.5 text-slate-500 hover:text-orange-600 hover:bg-slate-100 transition-colors font-bold focus:outline-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Remove Trash Button */}
        <button
          onClick={onRemove}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all focus:outline-none"
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
