import FilterChip from './FilterChip';

export default function ActiveFilters({ chips = [], onRemoveChip, onClearAll }) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
        Active Filters:
      </span>
      {chips.map((chip) => (
        <FilterChip
          key={chip.id}
          label={chip.label}
          onRemove={() => onRemoveChip(chip.key)}
        />
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline ml-2 transition cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  );
}
