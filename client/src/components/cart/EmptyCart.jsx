import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function EmptyCart() {
  return (
    <div className="max-w-md mx-auto text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 shadow-lg backdrop-blur-md space-y-6">
      {/* Icon illustration */}
      <div className="w-20 h-20 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-sm">
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
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-heading">
          Your cart is empty
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          {"Looks like you haven't added anything to your cart yet. Explore top restaurants near you to find delicious meals."}
        </p>
      </div>

      <Link
        to={ROUTES.RESTAURANTS}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
      >
        Browse Restaurants
      </Link>
    </div>
  );
}
