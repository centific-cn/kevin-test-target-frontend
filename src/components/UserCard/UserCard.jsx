import styles from './UserCard.module.css'

/**
 * UserCard component displays user information with avatar, name, and bio.
 * @param {Object} props
 * @param {string} props.name - User's display name (required)
 * @param {string} [props.avatar] - URL to user's avatar image (optional)
 * @param {string} [props.bio] - User's biography text (optional)
 */
function UserCard({ name, avatar, bio }) {
  const initials = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <div className={styles.card}>
      {avatar ? (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className={styles.avatar}
          data-testid="user-avatar"
        />
      ) : (
        <div className={styles.avatarPlaceholder} data-testid="avatar-placeholder">
          {initials}
        </div>
      )}
      <h2 className={styles.name}>{name}</h2>
      {bio && <p className={styles.bio}>{bio}</p>}
    </div>
  )
}

export default UserCard
