import { Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <PageWrapper title="404 Page Not Found">
      <div className="max-w-md mx-auto text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 shadow-lg backdrop-blur-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-sm text-2xl font-bold font-mono">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Page not found
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
          >
            Go back home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
