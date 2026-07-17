import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function HeroSection() {
  return (
    <div className="relative py-12 md:py-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Typography & CTA */}
        <div className="space-y-6 max-w-xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Fresh & Fast Delivery
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Crave it? <br />
            We&apos;ll <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">cart it.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Get your favorite meals from the best local restaurants delivered fresh and hot to your
            doorstep in minutes. Satisfy your cravings with CraveCart.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to={ROUTES.RESTAURANTS}
              className="px-6 py-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-100 hover:translate-y-[-1px] active:translate-y-0 transition"
            >
              Browse Restaurants
            </Link>
            <a
              href="#why-us"
              className="px-6 py-3 text-sm font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 hover:translate-y-[-1px] active:translate-y-0 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Premium Hero Image */}
        <div className="relative lg:block">
          <div className="relative mx-auto max-w-[500px] lg:max-w-none">
            {/* Background Blob decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-violet-200 rounded-3xl transform rotate-3 scale-95 opacity-70 filter blur-xl"></div>
            
            {/* Image Element */}
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop"
              alt="Delicious gourmet food spread"
              className="relative rounded-3xl shadow-xl w-full object-cover aspect-video sm:aspect-[4/3] max-h-[400px] border border-slate-200/50"
            />
            
            {/* Overlay Glass Card placeholder */}
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur border border-slate-200/80 rounded-2xl p-4 shadow-lg hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs text-slate-400">Average Delivery Time</p>
                <p className="text-sm font-bold text-slate-800">Under 25 Minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
