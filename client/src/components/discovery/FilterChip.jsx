export default function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold shadow-2xs">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="w-4 h-4 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-200 hover:text-orange-900 transition cursor-pointer"
      >
        ✕
      </button>
    </span>
  );
}
