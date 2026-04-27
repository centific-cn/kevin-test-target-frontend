import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge, type Status } from './StatusBadge';

describe('StatusBadge', () => {
  const statuses: Status[] = ['active', 'inactive', 'pending'];

  statuses.forEach((status) => {
    it(`renders ${status} status correctly`, () => {
      render(<StatusBadge status={status} label="Test Label" />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
  });

  it('applies active status data attribute', () => {
    render(<StatusBadge status="active" label="Service" />);
    const badge = screen.getByRole('status');
    const dot = badge.querySelector('[data-status="active"]');
    expect(dot).toBeInTheDocument();
  });

  it('applies inactive status data attribute', () => {
    render(<StatusBadge status="inactive" label="Service" />);
    const badge = screen.getByRole('status');
    const dot = badge.querySelector('[data-status="inactive"]');
    expect(dot).toBeInTheDocument();
  });

  it('applies pending status data attribute', () => {
    render(<StatusBadge status="pending" label="Service" />);
    const badge = screen.getByRole('status');
    const dot = badge.querySelector('[data-status="pending"]');
    expect(dot).toBeInTheDocument();
  });

  it('has correct aria-label for active status', () => {
    render(<StatusBadge status="active" label="Database" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Database: Active'
    );
  });

  it('has correct aria-label for inactive status', () => {
    render(<StatusBadge status="inactive" label="API" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'API: Inactive'
    );
  });

  it('has correct aria-label for pending status', () => {
    render(<StatusBadge status="pending" label="Queue" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Queue: Pending'
    );
  });
});
