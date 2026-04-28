import styles from './StatusBadge.module.css';

export type Status = 'active' | 'inactive' | 'pending';

export interface StatusBadgeProps {
  status: Status;
  label: string;
}

const statusLabels: Record<Status, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={styles.badge}
      role="status"
      aria-label={`${label}: ${statusLabels[status]}`}
    >
      <span
        className={`${styles.dot} ${styles[status]}`}
        data-status={status}
        aria-hidden="true"
      />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
