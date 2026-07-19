import { useLocation, Navigate, Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import { ROUTES } from '@/constants/routes';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';

export default function Success() {
  const location = useLocation();
  const state = location.state;

  if (!state || !state.orderId) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const { orderId, deliveryInfo, paymentMethod } = state;
  const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

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
            Thank you for ordering,{' '}
            <span className="font-semibold text-slate-800">{deliveryInfo.fullName}</span>! Your meal
            is being prepared and will be delivered shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left space-y-4 max-w-md mx-auto">
          {/* Order Ref */}
          <div className="flex justify-between items-center text-sm border-b border-slate-250 border-slate-200 pb-3">
            <span className="text-slate-500 font-medium">Order Reference</span>
            <span className="font-bold text-orange-655 text-orange-650 text-orange-600 font-mono tracking-wide">
              {orderId}
            </span>
          </div>

          {/* Delivery Address */}
          <div className="text-sm border-b border-slate-250 border-slate-200 pb-3 space-y-1">
            <span className="text-slate-500 font-medium block">Delivery Address</span>
            <p className="font-semibold text-slate-800">{deliveryInfo.addressLine}</p>
            <p className="text-xs text-slate-500">
              {deliveryInfo.city}, {deliveryInfo.state} - {deliveryInfo.pincode}
            </p>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Payment Method</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>{method?.icon}</span>
              <span>{method?.label || 'Payment'}</span>
            </span>
          </div>
        </div>

        {/* Estimated delivery banner */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 max-w-md mx-auto text-sm text-orange-800 font-semibold flex items-center justify-center gap-2">
          <span>⏰</span>
          <span>Estimated Delivery Time: 35-45 mins</span>
        </div>

        <div>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
