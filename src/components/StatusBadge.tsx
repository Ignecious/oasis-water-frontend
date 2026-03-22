import { OrderStatus } from '@/types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: '#FFF3CD', text: '#856404', label: 'Pending' },
  confirmed: { bg: '#D1ECF1', text: '#0C5460', label: 'Confirmed' },
  ready: { bg: '#D4EDDA', text: '#155724', label: 'Ready' },
  completed: { bg: '#E2E3E5', text: '#383D41', label: 'Completed' },
  cancelled: { bg: '#F8D7DA', text: '#721C24', label: 'Cancelled' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}
