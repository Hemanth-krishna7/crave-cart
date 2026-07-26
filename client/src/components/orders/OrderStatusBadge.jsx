import { ORDER_STATUS } from '@/constants/orderStatus';

const STATUS_STYLING = {
  [ORDER_STATUS.PREPARING]: 'bg-orange-50 border-orange-100 text-orange-800',
  [ORDER_STATUS.READY]: 'bg-indigo-50 border-indigo-100 text-indigo-800',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'bg-blue-50 border-blue-100 text-blue-800',
  [ORDER_STATUS.DELIVERED]: 'bg-emerald-50 border-emerald-100 text-emerald-800',
  [ORDER_STATUS.CANCELLED]: 'bg-rose-50 border-rose-100 text-rose-800',
};

export default function OrderStatusBadge({ status }) {
  const styles = STATUS_STYLING[status] || 'bg-slate-50 border-slate-100 text-slate-800';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      {status}
    </span>
  );
}
