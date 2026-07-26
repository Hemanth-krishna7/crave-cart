import { create } from 'zustand';

const INITIAL_STATE = {
  searchQuery: '',
  selectedCuisine: 'All',
  selectedAvailability: 'all',
  selectedRating: 'all',
  selectedSort: 'popular',
};

export const useDiscoveryStore = create((set) => ({
  ...INITIAL_STATE,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCuisine: (selectedCuisine) => set({ selectedCuisine }),
  setSelectedAvailability: (selectedAvailability) => set({ selectedAvailability }),
  setSelectedRating: (selectedRating) => set({ selectedRating }),
  setSelectedSort: (selectedSort) => set({ selectedSort }),

  removeFilter: (filterKey) => {
    set((state) => {
      if (filterKey === 'searchQuery') return { searchQuery: '' };
      if (filterKey === 'selectedCuisine') return { selectedCuisine: 'All' };
      if (filterKey === 'selectedAvailability') return { selectedAvailability: 'all' };
      if (filterKey === 'selectedRating') return { selectedRating: 'all' };
      if (filterKey === 'selectedSort') return { selectedSort: 'popular' };
      return state;
    });
  },

  resetFilters: () => set(INITIAL_STATE),

  setAllState: (partialState) =>
    set((state) => ({
      ...state,
      ...partialState,
    })),
}));

// Selectors
export const selectDiscoveryState = (state) => ({
  searchQuery: state.searchQuery,
  selectedCuisine: state.selectedCuisine,
  selectedAvailability: state.selectedAvailability,
  selectedRating: state.selectedRating,
  selectedSort: state.selectedSort,
});
