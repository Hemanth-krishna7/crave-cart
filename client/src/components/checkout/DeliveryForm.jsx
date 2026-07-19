import { useFormContext } from 'react-hook-form';

export default function DeliveryForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="text-xl" role="img" aria-label="delivery">
          📍
        </span>
        <h3 className="text-lg font-bold text-slate-800 font-heading">Delivery Address</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-orange-100 focus:border-orange-500'
            }`}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-xs font-semibold text-rose-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="10-digit mobile number"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
              errors.phoneNumber
                ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-orange-100 focus:border-orange-500'
            }`}
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p className="text-xs font-semibold text-rose-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Address Line */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="addressLine" className="block text-sm font-semibold text-slate-700">
            Address Line
          </label>
          <input
            id="addressLine"
            type="text"
            placeholder="Flat/House no., Street, Area"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
              errors.addressLine
                ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-orange-100 focus:border-orange-500'
            }`}
            {...register('addressLine')}
          />
          {errors.addressLine && (
            <p className="text-xs font-semibold text-rose-600">{errors.addressLine.message}</p>
          )}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label htmlFor="city" className="block text-sm font-semibold text-slate-700">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="e.g. Bengaluru"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
              errors.city
                ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-orange-100 focus:border-orange-500'
            }`}
            {...register('city')}
          />
          {errors.city && <p className="text-xs font-semibold text-rose-600">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label htmlFor="state" className="block text-sm font-semibold text-slate-700">
            State
          </label>
          <input
            id="state"
            type="text"
            placeholder="e.g. Karnataka"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
              errors.state
                ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-orange-100 focus:border-orange-500'
            }`}
            {...register('state')}
          />
          {errors.state && (
            <p className="text-xs font-semibold text-rose-600">{errors.state.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="pincode" className="block text-sm font-semibold text-slate-700">
            Pincode
          </label>
          <input
            id="pincode"
            type="text"
            placeholder="6-digit pincode"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
              errors.pincode
                ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-orange-100 focus:border-orange-500'
            }`}
            {...register('pincode')}
          />
          {errors.pincode && (
            <p className="text-xs font-semibold text-rose-600">{errors.pincode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
