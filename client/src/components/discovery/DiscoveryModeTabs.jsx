export default function DiscoveryModeTabs({ mode = 'restaurants', onChange }) {
  return (
    <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 shadow-2xs">
      <button
        type="button"
        onClick={() => onChange('restaurants')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
          mode === 'restaurants'
            ? 'bg-white text-orange-600 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>🏢</span>
        <span>Restaurants</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('dishes')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
          mode === 'dishes'
            ? 'bg-white text-orange-600 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>🍕</span>
        <span>Dishes</span>
      </button>
    </div>
  );
}
