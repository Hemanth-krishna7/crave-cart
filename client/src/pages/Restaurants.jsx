import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import RestaurantCard from '@/components/common/RestaurantCard';
import DishCard from '@/components/discovery/DishCard';
import DiscoveryModeTabs from '@/components/discovery/DiscoveryModeTabs';
import SearchBar from '@/components/discovery/SearchBar';
import DiscoveryFilters from '@/components/discovery/DiscoveryFilters';
import SortDropdown from '@/components/discovery/SortDropdown';
import ActiveFilters from '@/components/discovery/ActiveFilters';
import EmptyResults from '@/components/discovery/EmptyResults';
import {
  extractDynamicCuisines,
  applyUnifiedDiscovery,
  getDerivedFilterChips,
} from '@/services/discoveryService';
import { RESTAURANTS } from '@/data/restaurants';
import { MENU_ITEMS } from '@/data/menu';

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();

  const discoveryMode = searchParams.get('mode') || 'restaurants';
  const searchQuery = searchParams.get('search') || '';
  const selectedCuisine = searchParams.get('cuisine') || 'All';
  const selectedAvailability = searchParams.get('availability') || 'all';
  const selectedRating = searchParams.get('rating') || 'all';
  const selectedSort = searchParams.get('sort') || 'popular';

  const updateParam = (key, value, defaultValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== defaultValue) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const setDiscoveryMode = (mode) => updateParam('mode', mode, 'restaurants');
  const setSearchQuery = (q) => updateParam('search', q, '');
  const setSelectedCuisine = (c) => updateParam('cuisine', c, 'All');
  const setSelectedAvailability = (a) => updateParam('availability', a, 'all');
  const setSelectedRating = (r) => updateParam('rating', r, 'all');
  const setSelectedSort = (s) => updateParam('sort', s, 'popular');

  const removeFilter = (filterKey) => {
    const newParams = new URLSearchParams(searchParams);
    if (filterKey === 'searchQuery') newParams.delete('search');
    else if (filterKey === 'selectedCuisine') newParams.delete('cuisine');
    else if (filterKey === 'selectedAvailability') newParams.delete('availability');
    else if (filterKey === 'selectedRating') newParams.delete('rating');
    else if (filterKey === 'selectedSort') newParams.delete('sort');
    setSearchParams(newParams, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // 3. Dynamic Cuisines extraction
  const dynamicCuisines = useMemo(() => extractDynamicCuisines(RESTAURANTS), []);

  // 4. Memoized Unified Discovery Pipeline
  const processedItems = useMemo(() => {
    return applyUnifiedDiscovery(RESTAURANTS, MENU_ITEMS, {
      discoveryMode,
      searchQuery,
      selectedCuisine,
      selectedAvailability,
      selectedRating,
      selectedSort,
    });
  }, [
    discoveryMode,
    searchQuery,
    selectedCuisine,
    selectedAvailability,
    selectedRating,
    selectedSort,
  ]);

  // 5. Derived active filter chips metadata
  const activeFilterChips = useMemo(() => {
    return getDerivedFilterChips({
      searchQuery,
      selectedCuisine,
      selectedAvailability,
      selectedRating,
    });
  }, [searchQuery, selectedCuisine, selectedAvailability, selectedRating]);

  const searchPlaceholder =
    discoveryMode === 'dishes'
      ? 'Search dishes by name, category, or description...'
      : 'Search restaurants by name, cuisine, or description...';

  return (
    <PageWrapper title="Browse Discovery" className="pb-16" containerClassName="max-w-7xl">
      <div className="space-y-6">
        {/* Header Info & Segmented Discovery Mode Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-orange-500" />
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-orange-500">
                Discover CraveCart
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
                Find something <span className="font-serif italic font-normal text-slate-200">worth craving.</span>
              </h1>
            </div>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              {discoveryMode === 'dishes'
                ? 'Explore delicious dishes available across top local kitchens and order directly to your door.'
                : 'Discover top local kitchens, gourmet flavors, and fresh menu items delivered directly to your doorstep.'}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <DiscoveryModeTabs mode={discoveryMode} onChange={setDiscoveryMode} />
            <div className="text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-lg shrink-0">
              Showing <span className="text-orange-400">{processedItems.length}</span> {discoveryMode === 'dishes' ? 'Dishes' : 'Restaurants'}
            </div>
          </div>
        </div>

        {/* Discovery Controls Header Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder={searchPlaceholder}
            />
          </div>

          <div className="w-full md:w-auto flex justify-end shrink-0">
            <SortDropdown value={selectedSort} onChange={setSelectedSort} />
          </div>
        </div>

        {/* Discovery Filters Bar */}
        <DiscoveryFilters
          cuisines={dynamicCuisines}
          selectedCuisine={selectedCuisine}
          onCuisineChange={setSelectedCuisine}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={setSelectedAvailability}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
        />

        {/* Active Filter Chips & Clear Actions */}
        <ActiveFilters
          chips={activeFilterChips}
          onRemoveChip={removeFilter}
          onClearAll={resetFilters}
        />

        {/* Content Section: Grid of Restaurant Cards / Dish Cards or Empty State */}
        {processedItems.length === 0 ? (
          <EmptyResults onClearFilters={resetFilters} mode={discoveryMode} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {discoveryMode === 'dishes'
              ? processedItems.map((dish) => <DishCard key={dish.id} dish={dish} />)
              : processedItems.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
