import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function CheckoutEmptyState({ message }) {
  return (
    <div className="max-w-md mx-auto text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 shadow-lg backdrop-blur-md space-y-6">
      {/* Icon illustration */}
      <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-sm">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-heading">
          Invalid Checkout State
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          {message || 'No items available for checkout.'}
        </p>
      </div>

      <Link
        to={ROUTES.CART}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
      >
        Return to Cart
      </Link>
    </div>
  );
}
