export default function CategoryCard({ category }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-indigo-600 transition-colors duration-200 shadow-sm">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-200"></div>
      </div>
      <span className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors duration-200">
        {category.name}
      </span>
    </div>
  );
}
