/**
 * Reusable QuantitySelector component.
 * Encapsulates the UI for toggling between '+ ADD' and adaptive '[-] quantity [+]' controls.
 *
 * @param {number} quantity - Current quantity derived from Zustand cart store.
 * @param {function} onAdd - Handler to add item when quantity is 0.
 * @param {function} onIncrease - Handler to increment item quantity.
 * @param {function} onDecrease - Handler to decrement item quantity.
 * @param {string} [itemName='item'] - Accessible item name for ARIA labels.
 * @param {string} [size='md'] - Sizing variant ('sm' | 'md').
 * @param {string} [className=''] - Optional CSS class extensions.
 */
export default function QuantitySelector({
  quantity = 0,
  onAdd,
  onIncrease,
  onDecrease,
  itemName = 'item',
  size = 'md',
  className = '',
}) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        aria-label={`Add ${itemName} to cart`}
        className={`inline-flex items-center justify-center font-extrabold rounded-xl border border-orange-200 text-orange-600 bg-orange-50/50 hover:bg-orange-600 hover:text-white hover:border-orange-600 shadow-2xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer select-none ${
          size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-xs sm:text-sm'
        } ${className}`}
      >
        + ADD
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-between bg-orange-600 text-white rounded-xl shadow-2xs overflow-hidden transition-all duration-150 border border-orange-600 ${
        size === 'sm' ? 'h-7 min-w-[5.5rem]' : 'h-8 sm:h-9 min-w-[6.5rem]'
      } ${className}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label={`Decrease quantity of ${itemName}`}
        className="px-2.5 h-full flex items-center justify-center hover:bg-orange-700 active:bg-orange-800 transition-colors font-bold text-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer select-none"
      >
        −
      </button>

      <span className="px-2 text-xs sm:text-sm font-extrabold font-mono text-center select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase quantity of ${itemName}`}
        className="px-2.5 h-full flex items-center justify-center hover:bg-orange-700 active:bg-orange-800 transition-colors font-bold text-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer select-none"
      >
        +
      </button>
    </div>
  );
}
