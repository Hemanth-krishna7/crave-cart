export default function DiscoveryModeTabs({ mode = 'restaurants', onChange }) {
  return (
    <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
      <button
        type="button"
        onClick={() => onChange('restaurants')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
          mode === 'restaurants'
            ? 'bg-orange-600 text-white shadow-md shadow-orange-900/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <span>🏢</span>
        <span>Restaurants</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('dishes')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
          mode === 'dishes'
            ? 'bg-orange-600 text-white shadow-md shadow-orange-900/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <span>🍕</span>
        <span>Dishes</span>
      </button>
    </div>
  );
}
