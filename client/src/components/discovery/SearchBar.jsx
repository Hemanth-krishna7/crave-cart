export default function SearchBar({ value = '', onChange, onClear, placeholder = 'Search restaurants, cuisines, dishes...' }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search restaurants"
        className="w-full pl-11 pr-10 py-3.5 bg-white rounded-2xl border border-slate-200 text-slate-800 placeholder-slate-400 text-sm font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
        >
          <div className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xs font-bold">
            ✕
          </div>
        </button>
      )}
    </div>
  );
}
