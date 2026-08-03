import { ORDER_STATUS } from '@/constants/orderStatus';

const STATUS_STYLING = {
  [ORDER_STATUS.PREPARING]: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  [ORDER_STATUS.READY]: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  [ORDER_STATUS.DELIVERED]: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  [ORDER_STATUS.CANCELLED]: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
};

export default function OrderStatusBadge({ status }) {
  const styles = STATUS_STYLING[status] || 'bg-white/5 border-white/10 text-slate-300';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      {status}
    </span>
  );
}
