import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function EmptyCart() {
  return (
    <div className="max-w-md mx-auto text-center py-16 space-y-6">
      {/* Icon illustration */}
      <div className="w-20 h-20 mx-auto rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
        <svg
          className="w-10 h-10 stroke-[1.5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Your cart is empty
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          {"Looks like you haven't added anything to your cart yet. Explore top restaurants near you to find delicious meals."}
        </p>
      </div>

      <Link
        to={ROUTES.RESTAURANTS}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Browse Restaurants
      </Link>
    </div>
  );
}
