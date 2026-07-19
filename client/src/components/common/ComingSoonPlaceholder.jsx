import { Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import { ROUTES } from '@/constants/routes';

export default function ComingSoonPlaceholder({ title, description, icon: IconComponent }) {
  return (
    <PageWrapper title={title} className="py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
          <IconComponent className="w-10 h-10 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            {title}
          </h1>
          <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
            Coming Soon
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>

        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>
      </div>
    </PageWrapper>
  );
}
