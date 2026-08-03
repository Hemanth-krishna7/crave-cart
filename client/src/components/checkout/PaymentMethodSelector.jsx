import { useFormContext } from 'react-hook-form';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';

export default function PaymentMethodSelector() {
  const { register, watch } = useFormContext();
  const selectedMethod = watch('paymentMethod');

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-6 shadow-lg space-y-6 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="text-xl" role="img" aria-label="payment">
          💳
        </span>
        <h3 className="text-lg font-bold text-white font-heading">Payment Method</h3>
      </div>

      <div className="space-y-3" role="radiogroup" aria-label="Select Payment Method">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <label
              key={method.id}
              className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition duration-200 ${
                isSelected ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <input
                type="radio"
                value={method.id}
                className="sr-only"
                {...register('paymentMethod')}
              />

              {/* Custom radio button visual */}
              <span
                className={`mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isSelected ? 'border-orange-500 bg-orange-500' : 'border-white/20 bg-white/10'
                }`}
              >
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>

              {/* Option details */}
              <div className="flex-grow select-none">
                <div className="flex items-center gap-2">
                  <span className="text-lg" role="img" aria-label={method.label}>
                    {method.icon}
                  </span>
                  <span className="text-sm font-bold text-white">{method.label}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{method.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
