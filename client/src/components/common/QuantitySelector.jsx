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
        className={`inline-flex items-center justify-center font-bold rounded-lg bg-orange-600 border border-orange-700/20 text-white hover:bg-orange-500 hover:border-orange-600/20 active:bg-orange-700 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md hover:shadow-orange-600/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-neutral-900 cursor-pointer select-none ${
          size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm'
        } ${className}`}
      >
        <svg className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-between bg-orange-600 text-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 border border-orange-600/30 ${
        size === 'sm' ? 'h-7.5 min-w-[5.5rem]' : 'h-8.5 min-w-[6.5rem]'
      } ${className}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label={`Decrease quantity of ${itemName}`}
        className="px-2.5 h-full flex items-center justify-center hover:bg-orange-700 active:bg-orange-800 transition-colors font-extrabold text-base focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer select-none"
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
        className="px-2.5 h-full flex items-center justify-center hover:bg-orange-700 active:bg-orange-800 transition-colors font-extrabold text-base focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer select-none"
      >
        +
      </button>
    </div>
  );
}
