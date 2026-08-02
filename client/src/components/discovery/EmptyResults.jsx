export default function EmptyResults({ onClearFilters, mode = 'restaurants' }) {
  const isDishes = mode === 'dishes';

  return (
    <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-white/5 p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 shadow-lg my-8">
      <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-2xl shadow-md">
        🔍
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">
          No {isDishes ? 'Dishes' : 'Restaurants'} Match Your Search
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
          Try tweaking your search terms, clearing some filters, or adjusting your availability options.
        </p>
      </div>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  );
}
