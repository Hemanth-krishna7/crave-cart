import { formatCurrency } from '@/utils';

export default function RestaurantInfo({ restaurant }) {
  const { openingHours, deliveryFee, minOrder, address, contactNumber } = restaurant;

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-6 shadow-lg space-y-6 backdrop-blur-md">
      <h3 className="text-lg font-bold text-white tracking-tight font-heading border-b border-white/5 pb-3">
        Restaurant Info
      </h3>

      <div className="space-y-4">
        {/* Hours */}
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-xs font-semibold text-slate-400">Opening Hours</p>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">{openingHours}</p>
          </div>
        </div>

        {/* Delivery Fee */}
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h4l4-4v4"
            />
          </svg>
          <div>
            <p className="text-xs font-semibold text-slate-400">Delivery Fee</p>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">
              {deliveryFee === 0 ? (
                <span className="text-emerald-400 font-bold">FREE Delivery</span>
              ) : (
                formatCurrency(deliveryFee)
              )}
            </p>
          </div>
        </div>

        {/* Minimum Order */}
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <div>
            <p className="text-xs font-semibold text-slate-400">Minimum Order</p>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">{formatCurrency(minOrder)}</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
          <div>
            <p className="text-xs font-semibold text-slate-400">Address</p>
            <p className="text-sm font-medium text-slate-300 mt-0.5 leading-normal">{address}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <div>
            <p className="text-xs font-semibold text-slate-400">Contact Number</p>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">{contactNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
