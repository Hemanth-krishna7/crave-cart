import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'No Data Found',
  description = "We couldn't find what you were looking for.",
  actionLabel,
  actionTo,
  onActionClick,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto">
      <div className="text-slate-300 mb-4">
        {icon || (
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-bold text-white font-heading">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      {actionLabel && (actionTo || onActionClick) && (
        <div className="mt-6">
          {actionTo ? (
            <Link
              to={actionTo}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={onActionClick}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
