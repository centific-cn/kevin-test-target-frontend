import { useState } from 'react';
import styles from './UserAvatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface UserAvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
}

function getInitials(name: string): string {
  if (!name || !name.trim()) {
    return '?';
  }
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

export function UserAvatar({ src, name, size = 'md' }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = src && !imageError;
  const initials = getInitials(name);

  const ariaLabel = `${name || 'Unknown'}'s avatar`;

  if (showImage) {
    return (
      <img
        src={src}
        alt={ariaLabel}
        className={`${styles.avatar} ${styles[size]}`}
        onError={() => setImageError(true)}
        data-testid="avatar-image"
        data-size={size}
      />
    );
  }

  return (
    <div
      className={`${styles.avatar} ${styles.initials} ${styles[size]}`}
      role="img"
      aria-label={ariaLabel}
      data-testid="avatar-initials"
      data-size={size}
    >
      {initials}
    </div>
  );
}
