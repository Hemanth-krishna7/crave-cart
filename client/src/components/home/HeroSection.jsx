import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function HeroSection() {
  return (
    <div className="relative flex items-center min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      {/* Left-aligned content container */}
      <div className="relative z-10 max-w-2xl space-y-8 text-left">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-8 bg-orange-500" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
            Fresh Food • Fast Delivery
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-none font-extrabold">
          <span className="block font-serif italic font-normal text-slate-100 mb-2">Crave it?</span>
          <span className="block">
            We&apos;ll <span className="text-orange-500">cart it.</span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-light">
          Discover a complete culinary catalog. Browse top-rated local kitchens, explore individual dishes, and enjoy a seamless simulated ordering experience delivered right to your screen.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            to={ROUTES.RESTAURANTS}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-750 text-white font-bold rounded-xl shadow-lg shadow-orange-950/20 transition-all duration-200 text-sm hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
          >
            Browse Restaurants
          </Link>
          <Link
            to={`${ROUTES.RESTAURANTS}?mode=dishes`}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold rounded-xl transition-all duration-200 text-sm hover:translate-y-[-1px] backdrop-blur-xs focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
          >
            Explore Dishes
          </Link>
        </div>

        {/* Trust / Product Metrics */}
        <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-6 max-w-md">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">26</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Local Restaurants</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">266</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Unique Dishes</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">Multiple</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Gourmet Cuisines</p>
          </div>
        </div>
      </div>
    </div>
  );
}
