import { useLocation, Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import { ROUTES } from '@/constants/routes';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';
import { useOrderStore, selectOrderById } from '@/store/orderStore';
import { formatCurrency } from '@/utils';

export default function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const order = useOrderStore(selectOrderById(orderId));

  // Fallback state if orderId is missing or order is not found
  if (!orderId || !order) {
    return (
      <PageWrapper title="Order Details Retrieval" className="pb-16">
        <div className="max-w-md mx-auto text-center py-16 space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm text-2xl">
            ⚠️
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800 font-heading">Order Not Found</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We couldn&apos;t retrieve the details for this order. It may have expired or the reference is invalid.
            </p>
          </div>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition"
          >
            Return to Home
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const method = PAYMENT_METHODS.find((m) => m.id === order.payment.method);

  return (
    <PageWrapper title="Order Success" className="pb-16">
      <div className="max-w-xl mx-auto text-center py-12 space-y-8">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
          <svg className="w-12 h-12 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Order Placed Successfully!
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Thank you for ordering from <span className="font-semibold text-slate-800">{order.restaurant.name}</span>,{' '}
            <span className="font-semibold text-slate-800">{order.deliveryInfo.fullName}</span>! Your meal
            is being prepared and will be delivered shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left space-y-4 max-w-md mx-auto">
          {/* Order Ref */}
          <div className="flex justify-between items-center text-sm border-b border-slate-250 border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Order Reference</span>
            <span className="font-bold text-orange-600 font-mono tracking-wide">
              {order.id}
            </span>
          </div>

          {/* Restaurant Name */}
          <div className="flex justify-between items-center text-sm border-b border-slate-250 border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Restaurant</span>
            <span className="font-semibold text-slate-800">{order.restaurant.name}</span>
          </div>

          {/* Order Status */}
          <div className="flex justify-between items-center text-sm border-b border-slate-250 border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Order Status</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
              {order.status}
            </span>
          </div>

          {/* Total Payable */}
          <div className="flex justify-between items-center text-sm border-b border-slate-250 border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Total Amount</span>
            <span className="font-bold text-slate-900 font-mono">{formatCurrency(order.pricing.total)}</span>
          </div>

          {/* Delivery Address */}
          <div className="text-sm border-b border-slate-250 border-slate-200 pb-3 space-y-1">
            <span className="text-slate-500 font-medium block">Delivery Address</span>
            <p className="font-semibold text-slate-800">{order.deliveryInfo.addressLine}</p>
            <p className="text-xs text-slate-500">
              {order.deliveryInfo.city}, {order.deliveryInfo.state} - {order.deliveryInfo.pincode}
            </p>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Payment Method</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>{method?.icon}</span>
              <span>{method?.label || 'Payment'}</span>
              <span className="text-xs font-normal text-slate-500">({order.payment.status})</span>
            </span>
          </div>
        </div>

        {/* Estimated delivery banner */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 max-w-md mx-auto text-sm text-orange-800 font-semibold flex items-center justify-center gap-2">
          <span>⏰</span>
          <span>Estimated Delivery Time: {order.estimatedDeliveryTime}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Link
            to={ROUTES.HOME}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            to={ROUTES.ORDERS}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            View Orders
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
