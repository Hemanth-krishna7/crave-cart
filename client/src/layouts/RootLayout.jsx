import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { THEME } from '@/constants/theme';
import { APP_CONFIG } from '@/constants/app';

export default function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Restaurants', path: ROUTES.RESTAURANTS },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to={ROUTES.HOME} className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
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
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-50/50'
                          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right Header Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart Button Placeholder */}
              <Link
                to={ROUTES.CART}
                className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
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
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-indigo-600 rounded-full">
                  0
                </span>
              </Link>

              {/* User Profile Link Placeholder */}
              <Link
                to={ROUTES.PROFILE}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm border border-indigo-200 hover:opacity-90 transition-opacity"
                aria-label="User Profile"
              >
                U
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {/* Mobile Cart Shortcut */}
              <Link
                to={ROUTES.CART}
                className="relative p-2 mr-2 text-slate-600 hover:text-indigo-600 rounded-lg"
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
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                  0
                </span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none"
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
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/50'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-slate-100 my-2 pt-2 flex items-center justify-between px-3">
              <Link
                to={ROUTES.PROFILE}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-600 hover:text-indigo-600 text-sm font-medium flex items-center gap-2"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs border border-indigo-200">
                  U
                </div>
                My Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Responsive Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Company Profile */}
            <div className="space-y-4">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
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
                  <Link to={ROUTES.CART} className="hover:text-white transition-colors">
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
                    My Account
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
                  <a href="#help" className="hover:text-white transition-colors">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:text-white transition-colors">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact details */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}
                    className="hover:text-white transition-colors"
                  >
                    {APP_CONFIG.SUPPORT_EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>1800-CRAVE-CART</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Area */}
          <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} {THEME.BRAND_NAME}. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#facebook" className="hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#twitter" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#instagram" className="hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
