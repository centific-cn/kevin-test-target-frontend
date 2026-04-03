import styles from './StatusBadge.module.css'

const statusDotMap = {
  active: styles.dotActive,
  inactive: styles.dotInactive,
  pending: styles.dotPending,
}

function StatusBadge({ status, label }) {
  const dotClass = statusDotMap[status] || styles.dotInactive

  return (
    <span className={styles.badge}>
      <span className={`${styles.dot} ${dotClass}`} />
      <span className={styles.label}>{label}</span>
    </span>
  )
}

export default StatusBadge
