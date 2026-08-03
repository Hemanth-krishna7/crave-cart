export default function ReviewSection({ title, action, children }) {
  return (
    <div className="bg-neutral-900/60 rounded-xl border border-white/5 p-5 sm:p-6 shadow-lg space-y-4 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">{title}</h3>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}
