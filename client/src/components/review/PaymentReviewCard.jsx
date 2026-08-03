import ReviewSection from './ReviewSection';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';

export default function PaymentReviewCard({ paymentMethod }) {
  const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  return (
    <ReviewSection title="Payment Method">
      <div className="flex items-center gap-3">
        <span className="text-2xl shrink-0" role="img" aria-label="payment-icon">
          {method?.icon || '💳'}
        </span>
        <div>
          <p className="text-sm font-bold text-white">{method?.label || 'Payment Method'}</p>
          <p className="text-xs text-slate-400 mt-0.5">{method?.description || ''}</p>
        </div>
      </div>
    </ReviewSection>
  );
}
