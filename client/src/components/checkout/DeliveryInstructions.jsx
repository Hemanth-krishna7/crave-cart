import { useFormContext } from 'react-hook-form';

export default function DeliveryInstructions() {
  const { register } = useFormContext();

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-6 shadow-lg space-y-4 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="text-xl" role="img" aria-label="instructions">
          💬
        </span>
        <h3 className="text-lg font-bold text-white font-heading">Delivery Instructions</h3>
      </div>

      <div className="space-y-1">
        <label htmlFor="instructions" className="block text-sm font-semibold text-slate-300">
          Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          rows={3}
          placeholder="Apartment number, landmark, gate code, or any special delivery instructions."
          className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 resize-none transition duration-200"
          {...register('instructions')}
        />
      </div>
    </div>
  );
}
