export default function DiscoveryFilters({
  cuisines = ['All'],
  selectedCuisine = 'All',
  onCuisineChange,
  selectedAvailability = 'all',
  onAvailabilityChange,
  selectedRating = 'all',
  onRatingChange,
}) {
  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.0', label: '4.0+ ★' },
    { value: '4.5', label: '4.5+ ★' },
    { value: '5.0', label: '5.0 ★' },
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open Now' },
    { value: 'closed', label: 'Closed' },
  ];

  return (
    <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-white/5 p-4 sm:p-5 shadow-lg space-y-4">
      {/* Cuisine Filter Pills / Scrollable list */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Cuisine
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {cuisines.map((cuisine) => {
            const isActive = selectedCuisine === cuisine;
            return (
              <button
                key={cuisine}
                onClick={() => onCuisineChange(cuisine)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-350 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid for Availability and Rating dropdowns / pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
        {/* Availability */}
        <div className="space-y-1.5">
          <label htmlFor="availability-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Availability
          </label>
          <div className="flex items-center gap-1.5">
            {availabilityOptions.map((opt) => {
              const isActive = selectedAvailability === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onAvailabilityChange(opt.value)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-white/5 text-slate-350 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-1.5">
          <label htmlFor="rating-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Minimum Rating
          </label>
          <div className="flex items-center gap-1.5">
            {ratingOptions.map((opt) => {
              const isActive = selectedRating === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onRatingChange(opt.value)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white/5 text-slate-355 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
