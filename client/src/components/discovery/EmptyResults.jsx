export default function EmptyResults({ onClearFilters }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 shadow-xs my-8">
      <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 text-2xl shadow-2xs">
        🔍
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-800 font-heading">
          No Restaurants Match Your Search
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          Try tweaking your search terms, clearing some filters, or adjusting your availability options.
        </p>
      </div>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xs transition duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  );
}
