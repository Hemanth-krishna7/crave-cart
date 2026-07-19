import { useParams } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import EmptyState from '@/components/common/EmptyState';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import RestaurantInfo from '@/components/restaurant/RestaurantInfo';
import MenuSection from '@/components/restaurant/MenuSection';
import { RESTAURANTS } from '@/data/restaurants';
import { MENU_ITEMS } from '@/data/menu';
import { ROUTES } from '@/constants/routes';

export default function RestaurantDetails() {
  const { id } = useParams();

  const restaurant = RESTAURANTS.find((r) => r.id === id);
  const items = MENU_ITEMS[id] || [];

  if (!restaurant) {
    return (
      <PageWrapper title="Restaurant Not Found">
        <EmptyState
          title="Restaurant Not Found"
          description="The restaurant you are trying to view does not exist or has been removed."
          actionLabel="Browse Restaurants"
          actionTo={ROUTES.RESTAURANTS}
        />
      </PageWrapper>
    );
  }

  // Group items by category
  const categoriesOrder = [
    'Recommended',
    'Starters',
    'Main Course',
    'Pizza',
    'Burgers',
    'Desserts',
    'Drinks',
  ];

  // Collect any categories not in the standard order
  const itemCategories = [...new Set(items.map((item) => item.category))];
  const allCategories = [...categoriesOrder];
  itemCategories.forEach((cat) => {
    if (!allCategories.includes(cat)) {
      allCategories.push(cat);
    }
  });

  return (
    <PageWrapper title={restaurant.name} className="pb-16" containerClassName="max-w-7xl">
      <div className="space-y-8">
        {/* 1. Restaurant Header Banner */}
        <RestaurantHeader restaurant={restaurant} />

        {/* 2. Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Menu Sections (Left column, occupies 2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-heading border-b border-slate-200 pb-3">
              Menu Categories
            </h2>
            <div className="space-y-10">
              {allCategories.map((category) => {
                const categoryItems = items.filter((item) => item.category === category);
                return (
                  <MenuSection key={category} categoryTitle={category} items={categoryItems} />
                );
              })}
            </div>
          </div>

          {/* Sidebar Info Panel (Right column, occupies 1/3 on desktop) */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <RestaurantInfo restaurant={restaurant} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
