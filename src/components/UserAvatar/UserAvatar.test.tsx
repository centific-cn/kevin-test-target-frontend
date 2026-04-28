import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserAvatar, type AvatarSize } from './UserAvatar';

describe('UserAvatar', () => {
  describe('image display', () => {
    it('renders image when src is provided', () => {
      render(<UserAvatar src="https://example.com/avatar.jpg" name="John Doe" />);
      const img = screen.getByTestId('avatar-image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('has correct alt text for image', () => {
      render(<UserAvatar src="https://example.com/avatar.jpg" name="Jane Doe" />);
      expect(screen.getByAltText("Jane Doe's avatar")).toBeInTheDocument();
    });
  });

  describe('initials fallback', () => {
    it('renders initials when no src provided', () => {
      render(<UserAvatar name="John Doe" />);
      expect(screen.getByTestId('avatar-initials')).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('has correct aria-label for initials', () => {
      render(<UserAvatar name="Jane Smith" />);
      expect(screen.getByRole('img', { name: "Jane Smith's avatar" })).toBeInTheDocument();
    });

    it('extracts initials from two-word name', () => {
      render(<UserAvatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('extracts first letter from single-word name', () => {
      render(<UserAvatar name="Madonna" />);
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('shows question mark for empty name', () => {
      render(<UserAvatar name="" />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('shows question mark for whitespace-only name', () => {
      render(<UserAvatar name="   " />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('handles three-word name (first two words)', () => {
      render(<UserAvatar name="John Michael Doe" />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });
  });

  describe('image error handling', () => {
    it('falls back to initials when image fails to load', () => {
      render(<UserAvatar src="https://invalid-url.jpg" name="Test User" />);
      const img = screen.getByTestId('avatar-image');
      fireEvent.error(img);
      expect(screen.getByTestId('avatar-initials')).toBeInTheDocument();
      expect(screen.getByText('TU')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    const sizes: AvatarSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`applies ${size} size to image`, () => {
        render(<UserAvatar src="https://example.com/avatar.jpg" name="Test User" size={size} />);
        const img = screen.getByTestId('avatar-image');
        expect(img).toHaveAttribute('data-size', size);
      });

      it(`applies ${size} size to initials`, () => {
        render(<UserAvatar name="Test User" size={size} />);
        const initials = screen.getByTestId('avatar-initials');
        expect(initials).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('default size', () => {
    it('defaults to md size when size not provided', () => {
      render(<UserAvatar name="Test User" />);
      const initials = screen.getByTestId('avatar-initials');
      expect(initials).toHaveAttribute('data-size', 'md');
    });
  });
});
