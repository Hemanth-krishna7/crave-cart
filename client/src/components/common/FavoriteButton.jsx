import React from 'react';
import { useFavoritesStore, selectIsRestaurantFavorite, selectIsDishFavorite } from '@/store/favoritesStore';

export default function FavoriteButton({ id, type, name, className = '' }) {
  const isRestaurant = type === 'restaurant';
  const isFavorite = useFavoritesStore(
    isRestaurant ? selectIsRestaurantFavorite(id) : selectIsDishFavorite(id)
  );
  const toggleFavorite = useFavoritesStore((state) =>
    isRestaurant ? state.toggleRestaurantFavorite : state.toggleDishFavorite
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  const label = isFavorite
    ? `Remove ${name} from favorites`
    : `Add ${name} to favorites`;

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isFavorite}
      className={`p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-600 shadow-sm border border-slate-100 transition focus:outline-none focus:ring-2 focus:ring-rose-500/50 z-10 flex items-center justify-center cursor-pointer ${className}`}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-200 ${
          isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-500'
        }`}
        fill={isFavorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
