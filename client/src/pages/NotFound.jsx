import { Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <PageWrapper title="404 Page Not Found">
      <div className="max-w-md mx-auto text-center py-16">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 Error</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition"
          >
            Go back home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
