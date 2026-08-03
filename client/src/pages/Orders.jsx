import { Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import OrderCard from '@/components/orders/OrderCard';
import { useOrderStore, selectOrders } from '@/store/orderStore';
import { ROUTES } from '@/constants/routes';

export default function Orders() {
  const orders = useOrderStore(selectOrders);

  // Sort orders by newest first (descending by createdAt timestamp)
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Professional Empty State if no orders exist
  if (orders.length === 0) {
    return (
      <PageWrapper title="My Orders" className="pb-16">
        <div className="max-w-md mx-auto text-center py-16 bg-neutral-900/60 border border-white/5 rounded-xl p-8 shadow-lg backdrop-blur-md space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 shadow-sm">
            <svg
              className="w-10 h-10 stroke-[1.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">No Orders Placed Yet</h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
              Start exploring local restaurants to place your first order and satisfy your cravings!
            </p>
          </div>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 transition duration-200 focus:outline-none"
          >
            Start Ordering
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="My Orders" className="pb-16" containerClassName="max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            My Orders
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            View your order history and estimated delivery times
          </p>
        </div>

        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
