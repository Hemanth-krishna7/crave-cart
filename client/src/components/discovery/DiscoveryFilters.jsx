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
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Cuisine Filter Pills / Scrollable list */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
          Cuisine
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {cuisines.map((cuisine) => {
            const isActive = selectedCuisine === cuisine;
            return (
              <button
                key={cuisine}
                onClick={() => onCuisineChange(cuisine)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid for Availability and Rating dropdowns / pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
        {/* Availability */}
        <div className="space-y-1.5">
          <label htmlFor="availability-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
            Availability
          </label>
          <div className="flex items-center gap-1.5">
            {availabilityOptions.map((opt) => {
              const isActive = selectedAvailability === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onAvailabilityChange(opt.value)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold text-center transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
          <label htmlFor="rating-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
            Minimum Rating
          </label>
          <div className="flex items-center gap-1.5">
            {ratingOptions.map((opt) => {
              const isActive = selectedRating === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onRatingChange(opt.value)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold text-center transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
