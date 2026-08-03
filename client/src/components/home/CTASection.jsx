import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function CTASection() {
  return (
    <div className="relative bg-gradient-to-br from-orange-500/10 via-neutral-950/40 to-orange-950/20 border border-white/5 text-white rounded-2xl overflow-hidden py-12 px-6 sm:px-12 md:py-14 text-center shadow-2xl backdrop-blur-md">
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Ready to satisfy your cravings?
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Explore menus from top-rated restaurants near you. Simple ordering, simulated tracking,
          and fast checkout.
        </p>
        <div className="pt-2">
          <Link
            to={ROUTES.RESTAURANTS}
            className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-lg text-white bg-orange-600 hover:bg-orange-750 shadow-md shadow-orange-950/20 transition duration-200"
          >
            Explore Restaurants
          </Link>
        </div>
      </div>

      {/* Decorative design bubbles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-x-12 -translate-y-12 filter blur-lg"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full translate-x-16 translate-y-16 filter blur-lg"></div>
    </div>
  );
}
