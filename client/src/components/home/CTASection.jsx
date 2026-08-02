import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function CTASection() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl overflow-hidden py-12 px-6 sm:px-12 md:py-16 text-center shadow-lg">
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to satisfy your cravings?
        </h2>
        <p className="text-indigo-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Explore menus from top-rated restaurants near you. Simple ordering, simulated tracking,
          and fast checkout.
        </p>
        <div className="pt-2">
          <Link
            to={ROUTES.RESTAURANTS}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-indigo-700 bg-white hover:bg-slate-50 shadow-md transition"
          >
            Explore Restaurants
          </Link>
        </div>
      </div>

      {/* Decorative design bubbles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-x-12 -translate-y-12 filter blur-lg"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full translate-x-16 translate-y-16 filter blur-lg"></div>
    </div>
  );
}
