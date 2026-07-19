import PageWrapper from '@/components/common/PageWrapper';
import RestaurantCard from '@/components/common/RestaurantCard';
import { RESTAURANTS } from '@/data/restaurants';

export default function Restaurants() {
  return (
    <PageWrapper title="Browse Restaurants" className="pb-16">
      {/* Header Info Section */}
      <div className="text-center md:text-left mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Browse Restaurants
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
          Discover top local kitchens, gourmet flavors, and fresh menu items delivered directly to your doorstep.
        </p>
      </div>

      {/* Grid of Restaurants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {RESTAURANTS.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </PageWrapper>
  );
}
