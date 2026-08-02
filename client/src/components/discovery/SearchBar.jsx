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
        className="w-full pl-11 pr-12 py-3.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder-slate-400 text-sm font-medium shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition duration-200"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[10px] font-extrabold text-slate-300">
            ✕
          </div>
        </button>
      )}
    </div>
  );
}
