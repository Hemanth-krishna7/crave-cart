import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryCard from '@/components/home/CategoryCard';
import RestaurantCard from '@/components/common/RestaurantCard';
import FeatureCard from '@/components/home/FeatureCard';
import CTASection from '@/components/home/CTASection';
import { CATEGORIES } from '@/data/categories';
import { RESTAURANTS } from '@/data/restaurants';

export default function Home() {
  useEffect(() => {
    document.title = 'Home | CraveCart';
  }, []);

  const features = [
    {
      title: 'Super Fast Delivery',
      description: 'Your meals delivered in under 25 minutes. Hot, fresh, and right on time.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Premium Selection',
      description: 'Only the top-rated local eateries and cuisines curated by our dedicated team.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      title: 'Interactive Order Tracking',
      description: 'Track the simulated status of your order live from kitchen preparation through mock delivery.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Immersive Hero Section */}
      <HeroSection />

      {/* Content Container for remaining sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 sm:space-y-24 w-full">
        {/* 2. Categories Preview */}
        <section className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Browse by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Find exactly what you are craving from our diverse categories.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* 3. Featured Restaurants */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Featured Restaurants
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Handpicked selections with top-tier ratings and fast delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {RESTAURANTS.filter((res) => res.featured).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* 4. Why Choose CraveCart */}
        <section id="why-us" className="space-y-8 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Choose CraveCart?
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              We work with the best in town to offer you high-quality choices and flawless service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        {/* 5. Final Call-to-Action Section */}
        <CTASection />
      </div>
    </div>
  );
}
