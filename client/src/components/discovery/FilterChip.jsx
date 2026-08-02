export default function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/20 border border-orange-500/35 text-orange-300 text-xs font-semibold shadow-md">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="w-4 h-4 rounded-full flex items-center justify-center text-orange-400 hover:bg-orange-500/30 hover:text-white transition duration-200 cursor-pointer"
      >
        ✕
      </button>
    </span>
  );
}
