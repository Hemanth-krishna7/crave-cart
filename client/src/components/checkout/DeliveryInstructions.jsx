import { useFormContext } from 'react-hook-form';

export default function DeliveryInstructions() {
  const { register } = useFormContext();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="text-xl" role="img" aria-label="instructions">
          💬
        </span>
        <h3 className="text-lg font-bold text-slate-800 font-heading">Delivery Instructions</h3>
      </div>

      <div className="space-y-1">
        <label htmlFor="instructions" className="block text-sm font-semibold text-slate-700">
          Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          rows={3}
          placeholder="Apartment number, landmark, gate code, or any special delivery instructions."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500 resize-none transition"
          {...register('instructions')}
        />
      </div>
    </div>
  );
}
