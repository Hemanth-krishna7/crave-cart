export default function ReviewSection({ title, action, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-800 font-heading">{title}</h3>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}
