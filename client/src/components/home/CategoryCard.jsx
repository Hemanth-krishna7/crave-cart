import { Link } from 'react-router-dom';
import { getCategoryDiscoveryUrl } from '@/utils/categoryNormalization';

export default function CategoryCard({ category }) {
  const discoveryUrl = getCategoryDiscoveryUrl(category);

  return (
    <Link
      to={discoveryUrl}
      className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-2xl p-1"
      aria-label={`Browse ${category.name} restaurants`}
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-colors duration-200 shadow-sm">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-200"></div>
      </div>
      <span className="mt-3 text-sm font-semibold text-slate-300 group-hover:text-orange-400 transition-colors duration-200">
        {category.name}
      </span>
    </Link>
  );
}
