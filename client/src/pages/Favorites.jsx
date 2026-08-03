import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getFavoriteRestaurants, getFavoriteDishes } from '@/utils/favoritesHelper';
import RestaurantCard from '@/components/common/RestaurantCard';
import DishCard from '@/components/discovery/DishCard';
import PageWrapper from '@/components/common/PageWrapper';

export default function Favorites() {
  const [activeTab, setActiveTab] = useState('restaurants'); // 'restaurants' | 'dishes'

  const favoriteRestaurantIds = useFavoritesStore((state) => state.favoriteRestaurantIds);
  const favoriteDishIds = useFavoritesStore((state) => state.favoriteDishIds);

  const favoriteRestaurants = getFavoriteRestaurants(favoriteRestaurantIds);
  const favoriteDishes = getFavoriteDishes(favoriteDishIds);

  const hasAnyFavorites = favoriteRestaurants.length > 0 || favoriteDishes.length > 0;

  // Handle completely empty state
  if (!hasAnyFavorites) {
    return (
      <PageWrapper title="Favorites" className="pb-16">
        <div className="max-w-md mx-auto text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 shadow-lg backdrop-blur-md space-y-6">
          <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
              Your Favorites List is Empty
            </h1>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
              Save restaurants and dishes you love to find them quickly later.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to={ROUTES.RESTAURANTS}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold shadow-md shadow-orange-950/20 transition duration-200 cursor-pointer text-center"
            >
              Explore Restaurants
            </Link>
            <Link
              to={`${ROUTES.RESTAURANTS}?mode=dishes`}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-bold shadow-sm transition duration-200 cursor-pointer text-center"
            >
              Browse Dishes
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Favorites" className="pb-16" containerClassName="max-w-7xl">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Favorites
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your saved restaurants and dishes.
          </p>
        </div>

        {/* Segmented Controls / Tabs */}
        <div className="flex border-b border-white/5" role="tablist" aria-label="Favorites navigation">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`py-3 px-4 text-sm font-bold border-b-2 transition duration-200 cursor-pointer ${
              activeTab === 'restaurants'
                ? 'border-orange-500 text-orange-500 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
            }`}
            aria-selected={activeTab === 'restaurants'}
            role="tab"
            id="tab-restaurants"
            aria-controls="panel-restaurants"
          >
            Restaurants ({favoriteRestaurants.length})
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`py-3 px-4 text-sm font-bold border-b-2 transition duration-200 cursor-pointer ${
              activeTab === 'dishes'
                ? 'border-orange-500 text-orange-500 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
            }`}
            aria-selected={activeTab === 'dishes'}
            role="tab"
            id="tab-dishes"
            aria-controls="panel-dishes"
          >
            Dishes ({favoriteDishes.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="focus:outline-none">
          {activeTab === 'restaurants' ? (
            <div
              id="panel-restaurants"
              role="tabpanel"
              aria-labelledby="tab-restaurants"
              className="focus:outline-none"
            >
              {favoriteRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
                  {favoriteRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 max-w-xl mx-auto mt-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white mb-1">
                    No favorite restaurants yet
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Explore local eateries and bookmark your favorite kitchens.
                  </p>
                  <Link
                    to={ROUTES.RESTAURANTS}
                    className="inline-flex px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition duration-200 cursor-pointer shadow-md shadow-orange-950/20"
                  >
                    Browse Restaurants
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div
              id="panel-dishes"
              role="tabpanel"
              aria-labelledby="tab-dishes"
              className="focus:outline-none"
            >
              {favoriteDishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
                  {favoriteDishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 max-w-xl mx-auto mt-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white mb-1">
                    No favorite dishes yet
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Discover mouth-watering dishes and save them for quick ordering.
                  </p>
                  <Link
                    to={`${ROUTES.RESTAURANTS}?mode=dishes`}
                    className="inline-flex px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition duration-200 cursor-pointer shadow-md shadow-orange-950/20"
                  >
                    Browse Dishes
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
