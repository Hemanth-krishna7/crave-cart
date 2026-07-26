export default function SortDropdown({ value = 'popular', onChange }) {
  const options = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Rating (High → Low)' },
    { value: 'delivery', label: 'Delivery Time (Fastest)' },
    { value: 'name', label: 'Alphabetical (A → Z)' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-dropdown" className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 font-heading">
        Sort By
      </label>
      <div className="relative">
        <select
          id="sort-dropdown"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Sort restaurants by"
          className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer transition"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
