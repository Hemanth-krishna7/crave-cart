import { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { THEME } from '@/constants/theme';
import { useCartStore, selectRestaurantGroupCount } from '@/store/cartStore';
import { useFavoritesStore, selectTotalFavoriteCount } from '@/store/favoritesStore';
import foodBg from '@/assets/food-background.jpg';

export default function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const restaurantGroupCount = useCartStore(selectRestaurantGroupCount);
  const totalFavorites = useFavoritesStore(selectTotalFavoriteCount);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDiscovery = location.pathname === ROUTES.RESTAURANTS;
  const isDarkEnv = true;
  const isHeaderDark = true;

  const navLinks = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Restaurants', path: ROUTES.RESTAURANTS },
    { label: 'Orders', path: ROUTES.ORDERS },
    { label: 'Favorites', path: ROUTES.FAVORITES },
  ];

  return (
    <div className={`relative flex flex-col min-h-screen transition-colors duration-500 ${
      isHome ? 'bg-[#0c0c0c]' : 'bg-[#0e0d0c]'
    } text-slate-100 selection:bg-orange-500/30 selection:text-white`}>
      {/* Layer 1: Background Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <img 
          src={foodBg} 
          alt="" 
          className={`w-full h-full object-cover object-center scale-102 transition-all duration-750 ${
            isHome 
              ? 'filter brightness-[0.7] contrast-[1.05] opacity-[0.80] blur-[0.3px]' 
              : isDiscovery
                ? 'filter brightness-[0.48] contrast-[1.02] opacity-[0.24] blur-[1px]'
                : 'filter brightness-[0.25] contrast-[1.0] opacity-[0.08] blur-[2px]'
          }`}
        />
      </div>

      {/* Layer 2: Transparent Atmospheric Overlay & Gradient */}
      {/* Home Overlay */}
      <div 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-750 ${
          isHome ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-r from-black via-black/75 to-transparent`}
        aria-hidden="true"
      />
      {/* Discovery Overlay Layers */}
      <div 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-750 ${
          isDiscovery ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {/* Layer 3a: Vertical Dark Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0e0d0c]/40 to-[#0e0d0c]" />
        
        {/* Layer 3b: Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,rgba(14,13,12,0.9)_95%)]" />
        
        {/* Layer 4: Subtle Warm Orange Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,88,12,0.11)_0%,rgba(0,0,0,0)_50%)]" />
      </div>
      {/* Default Overlay */}
      <div 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-750 ${
          (!isHome && !isDiscovery) ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-br from-[#0c0c0c] via-[#0e0d0c] to-[#0a0a09]`}
        aria-hidden="true"
      />

      {/* Layer 3: Application UI Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isHeaderDark 
          ? 'bg-[#0c0c0c]/40 backdrop-blur-md border-b border-white/5 shadow-xs' 
          : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to={ROUTES.HOME} className="flex items-center gap-2">
                <span className={`text-2xl font-extrabold tracking-tight ${
                  isHeaderDark 
                    ? 'text-white' 
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'
                }`}>
                  {THEME.BRAND_NAME}
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex space-x-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center ${
                        isActive
                          ? isHeaderDark
                            ? 'text-white bg-white/10'
                            : 'text-indigo-600 bg-indigo-50/50'
                          : isHeaderDark
                            ? 'text-slate-300 hover:text-white hover:bg-white/5'
                            : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.label}
                    {link.label === 'Favorites' && totalFavorites > 0 && (
                      <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                        isHeaderDark ? 'bg-orange-600 text-white' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {totalFavorites}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right Header Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart Button */}
              <Link
                to={ROUTES.CART}
                className={`relative p-2 rounded-lg transition-colors ${
                  isHeaderDark 
                    ? 'text-slate-300 hover:text-white hover:bg-white/5' 
                    : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                }`}
                aria-label="View Cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {restaurantGroupCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-orange-600 rounded-full">
                    {restaurantGroupCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {/* Mobile Cart Shortcut */}
              <Link
                to={ROUTES.CART}
                className={`relative p-2 mr-2 rounded-lg ${
                  isHeaderDark 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-600 hover:text-orange-600'
                }`}
                aria-label="View Cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {restaurantGroupCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full">
                    {restaurantGroupCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors focus:outline-none ${
                  isHeaderDark 
                    ? 'text-slate-300 hover:text-white hover:bg-white/5' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className={`md:hidden px-4 pt-2 pb-4 space-y-1 ${
            isHeaderDark 
              ? 'bg-[#0c0c0c]/95 border-b border-white/10' 
              : 'bg-white border-b border-slate-200'
          }`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? isHeaderDark
                        ? 'text-white bg-white/15'
                        : 'text-indigo-600 bg-indigo-50/50'
                      : isHeaderDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.label === 'Favorites' && totalFavorites > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    isHeaderDark ? 'bg-orange-600 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {totalFavorites}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Responsive Footer */}
      <footer className="bg-black/90 backdrop-blur-md text-slate-400 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Company Profile */}
            <div className="space-y-4">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                {THEME.BRAND_NAME}
              </span>
              <p className="text-sm leading-relaxed text-slate-400">
                Your ultimate companion for grocery shopping and meal planning. Discover fresh
                ingredients, gourmet options, and local culinary favorites delivered directly to your
                doorstep.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to={ROUTES.HOME} className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">
                    Browse Restaurants
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Legal */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Customer Care & Legal
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to={ROUTES.CART} className="hover:text-white transition-colors">
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.TERMS} className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PRIVACY} className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact details */}
            {/* Column 4: Contact Us */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Contact Us
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Have feedback or questions? Reach out to us using the contact form.
              </p>
              <Link
                to={ROUTES.CONTACT}
                className="inline-flex px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition duration-200 cursor-pointer shadow-md shadow-orange-950/20 focus:outline-none"
              >
                Contact Page
              </Link>
            </div>
          </div>

          {/* Bottom Copyright Area */}
          <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} {THEME.BRAND_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
