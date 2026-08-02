import { useEffect, useMemo } from 'react';
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
import { useDiscoveryStore } from '@/store/discoveryStore';
import {
  extractDynamicCuisines,
  applyUnifiedDiscovery,
  getDerivedFilterChips,
} from '@/services/discoveryService';
import { RESTAURANTS } from '@/data/restaurants';
import { MENU_ITEMS } from '@/data/menu';

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();

  const discoveryMode = useDiscoveryStore((state) => state.discoveryMode);
  const searchQuery = useDiscoveryStore((state) => state.searchQuery);
  const selectedCuisine = useDiscoveryStore((state) => state.selectedCuisine);
  const selectedAvailability = useDiscoveryStore((state) => state.selectedAvailability);
  const selectedRating = useDiscoveryStore((state) => state.selectedRating);
  const selectedSort = useDiscoveryStore((state) => state.selectedSort);

  const setDiscoveryMode = useDiscoveryStore((state) => state.setDiscoveryMode);
  const setSearchQuery = useDiscoveryStore((state) => state.setSearchQuery);
  const setSelectedCuisine = useDiscoveryStore((state) => state.setSelectedCuisine);
  const setSelectedAvailability = useDiscoveryStore((state) => state.setSelectedAvailability);
  const setSelectedRating = useDiscoveryStore((state) => state.setSelectedRating);
  const setSelectedSort = useDiscoveryStore((state) => state.setSelectedSort);
  const removeFilter = useDiscoveryStore((state) => state.removeFilter);
  const resetFilters = useDiscoveryStore((state) => state.resetFilters);
  const setAllState = useDiscoveryStore((state) => state.setAllState);

  // 1. Synchronize URL query parameters into Discovery Store on mount or external URL change
  useEffect(() => {
    const urlMode = searchParams.get('mode') || 'restaurants';
    const urlSearch = searchParams.get('search') || '';
    const urlCuisine = searchParams.get('cuisine') || 'All';
    const urlAvailability = searchParams.get('availability') || 'all';
    const urlRating = searchParams.get('rating') || 'all';
    const urlSort = searchParams.get('sort') || 'popular';

    setAllState({
      discoveryMode: urlMode,
      searchQuery: urlSearch,
      selectedCuisine: urlCuisine,
      selectedAvailability: urlAvailability,
      selectedRating: urlRating,
      selectedSort: urlSort,
    });
  }, [searchParams, setAllState]);

  // 2. Synchronize Discovery Store state changes to URL query parameters while preserving unrelated params
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (discoveryMode && discoveryMode !== 'restaurants') newParams.set('mode', discoveryMode);
    else newParams.delete('mode');

    if (searchQuery && searchQuery.trim()) newParams.set('search', searchQuery.trim());
    else newParams.delete('search');

    if (selectedCuisine && selectedCuisine !== 'All') newParams.set('cuisine', selectedCuisine);
    else newParams.delete('cuisine');

    if (selectedAvailability && selectedAvailability !== 'all') newParams.set('availability', selectedAvailability);
    else newParams.delete('availability');

    if (selectedRating && selectedRating !== 'all') newParams.set('rating', selectedRating);
    else newParams.delete('rating');

    if (selectedSort && selectedSort !== 'popular') newParams.set('sort', selectedSort);
    else newParams.delete('sort');

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [
    discoveryMode,
    searchQuery,
    selectedCuisine,
    selectedAvailability,
    selectedRating,
    selectedSort,
    searchParams,
    setSearchParams,
  ]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Browse {discoveryMode === 'dishes' ? 'Dishes' : 'Restaurants'}
              </h1>
              <DiscoveryModeTabs mode={discoveryMode} onChange={setDiscoveryMode} />
            </div>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl">
              {discoveryMode === 'dishes'
                ? 'Explore delicious dishes available across top local kitchens and order directly to your door.'
                : 'Discover top local kitchens, gourmet flavors, and fresh menu items delivered directly to your doorstep.'}
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl shrink-0 self-start md:self-auto">
            Showing <span className="font-bold text-slate-800">{processedItems.length}</span> {discoveryMode === 'dishes' ? 'dishes' : 'restaurants'}
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
