import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favoriteRestaurantIds: [],
      favoriteDishIds: [],

      toggleRestaurantFavorite: (restaurantId) => {
        const ids = get().favoriteRestaurantIds;
        const exists = ids.includes(restaurantId);
        set({
          favoriteRestaurantIds: exists
            ? ids.filter((id) => id !== restaurantId)
            : [...ids, restaurantId],
        });
      },

      toggleDishFavorite: (dishId) => {
        const ids = get().favoriteDishIds;
        const exists = ids.includes(dishId);
        set({
          favoriteDishIds: exists
            ? ids.filter((id) => id !== dishId)
            : [...ids, dishId],
        });
      },

      removeRestaurantFavorite: (restaurantId) => {
        set((state) => ({
          favoriteRestaurantIds: state.favoriteRestaurantIds.filter((id) => id !== restaurantId),
        }));
      },

      removeDishFavorite: (dishId) => {
        set((state) => ({
          favoriteDishIds: state.favoriteDishIds.filter((id) => id !== dishId),
        }));
      },

      clearRestaurantFavorites: () => set({ favoriteRestaurantIds: [] }),
      clearDishFavorites: () => set({ favoriteDishIds: [] }),
      clearAllFavorites: () => set({ favoriteRestaurantIds: [], favoriteDishIds: [] }),
    }),
    {
      name: 'crave-cart-favorites', // LocalStorage persistence key
    }
  )
);

// Derived Selectors
export const selectFavoriteRestaurantIds = (state) => state.favoriteRestaurantIds;
export const selectFavoriteDishIds = (state) => state.favoriteDishIds;
export const selectIsRestaurantFavorite = (restaurantId) => (state) =>
  state.favoriteRestaurantIds.includes(restaurantId);
export const selectIsDishFavorite = (dishId) => (state) =>
  state.favoriteDishIds.includes(dishId);
export const selectFavoriteRestaurantCount = (state) => state.favoriteRestaurantIds.length;
export const selectFavoriteDishCount = (state) => state.favoriteDishIds.length;
export const selectTotalFavoriteCount = (state) =>
  state.favoriteRestaurantIds.length + state.favoriteDishIds.length;
