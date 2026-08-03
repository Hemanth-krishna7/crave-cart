import FoodCard from './FoodCard';

export default function MenuSection({ categoryTitle, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Category Heading */}
      <div className="border-b border-white/5 pb-2">
        <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
          {categoryTitle}
          <span className="ml-2 text-xs font-semibold text-slate-400">
            ({items.length})
          </span>
        </h3>
      </div>

      {/* Grid of FoodCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
