import { useState } from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { formatCurrency } from '@/utils';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';
import { RESTAURANT_FALLBACK_IMAGE } from '@/utils/imageFallbacks';

export default function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    id,
    restaurant,
    items,
    pricing,
    deliveryInfo,
    instructions,
    payment,
    status,
    createdAt,
    estimatedDeliveryTime,
  } = order;

  // Format Date
  const orderDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const paymentMethodDetails = PAYMENT_METHODS.find((m) => m.id === payment.method);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const fallbackRestaurantImage = RESTAURANT_FALLBACK_IMAGE;

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 shadow-lg overflow-hidden transition-all duration-300 backdrop-blur-md">
      {/* Summary Card Header (Always Visible) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition duration-150 select-none"
      >
        <div className="flex gap-4 items-center">
          {/* Restaurant image */}
          <img
            src={restaurant.image || fallbackRestaurantImage}
            alt={restaurant.name}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = fallbackRestaurantImage;
            }}
            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10 shadow-sm"
          />

          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-extrabold text-white font-heading">
              {restaurant.name}
            </h4>
            <p className="text-xs font-semibold text-slate-400">{orderDate}</p>
            <p className="text-xs font-mono font-bold text-slate-400">
              ID: <span className="text-orange-400">{id}</span>
            </p>
          </div>
        </div>

        {/* Action / Badges Section */}
        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
          <div className="text-left md:text-right space-y-1">
            <p className="text-xs text-slate-400 font-semibold">
              {itemsCount} {itemsCount === 1 ? 'item' : 'items'} •{' '}
              <span className="text-orange-400 font-bold">{estimatedDeliveryTime}</span>
            </p>
            <p className="text-sm font-extrabold text-white font-mono">
              {formatCurrency(pricing.total)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <OrderStatusBadge status={status} />

            {/* Expand / Collapse Button */}
            <button
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse order details' : 'Expand order details'}
              onClick={(e) => {
                e.stopPropagation(); // Prevent duplicate trigger from parent div click
                setIsExpanded(!isExpanded);
              }}
              className={`p-1.5 rounded-lg border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition focus:outline-none ${
                isExpanded ? 'bg-white/10 text-white' : ''
              }`}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Extended Section details (Progressive Disclosure) */}
      {isExpanded && (
        <div className="border-t border-white/5 bg-black/20 p-5 sm:p-6 space-y-6">
          {/* Ordered items details */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
              Items Ordered
            </h5>
            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden divide-y divide-white/5">
              {items.map((item) => (
                <div key={item.id} className="p-3 sm:p-4 flex justify-between items-center text-sm">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-slate-200 font-mono">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery address & info */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
                Delivery Details
              </h5>
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 space-y-2 text-sm text-slate-300">
                <p className="font-bold text-white">{deliveryInfo.fullName}</p>
                <p className="font-semibold text-slate-200">{deliveryInfo.phoneNumber}</p>
                <p className="mt-1.5 leading-relaxed">{deliveryInfo.addressLine}</p>
                <p>
                  {deliveryInfo.city}, {deliveryInfo.state} - {deliveryInfo.pincode}
                </p>

                {/* Instructions */}
                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-slate-400">
                  <span className="font-bold text-slate-400 block mb-1">Instructions:</span>
                  {instructions ? (
                    <span className="italic font-medium text-slate-200">
                      &ldquo;{instructions}&rdquo;
                    </span>
                  ) : (
                    <span className="italic text-slate-500">No delivery instructions provided.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment & pricing recap details */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
                Payment & Summary
              </h5>
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 space-y-4 text-sm text-slate-300">
                {/* Method */}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Payment Method</span>
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <span>{paymentMethodDetails?.icon}</span>
                    <span>{paymentMethodDetails?.label || 'Payment'}</span>
                    <span className="text-xs text-slate-500 font-normal">({payment.status})</span>
                  </span>
                </div>

                {/* Pricing Summary list */}
                <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-medium font-mono text-slate-200">{formatCurrency(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Fee</span>
                    <span className="font-medium font-mono text-slate-200">{formatCurrency(pricing.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/5">
                    <span>Total Amount Paid</span>
                    <span className="font-mono text-orange-400">{formatCurrency(pricing.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
