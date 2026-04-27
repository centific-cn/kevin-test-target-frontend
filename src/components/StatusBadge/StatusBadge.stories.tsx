import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge, type Status } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'inactive', 'pending'] as Status[],
      description: 'The status state of the badge',
    },
    label: {
      control: 'text',
      description: 'The label text displayed in the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Active: Story = {
  args: {
    status: 'active',
    label: 'Active Service',
  },
};

export const Inactive: Story = {
  args: {
    status: 'inactive',
    label: 'Inactive Service',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
    label: 'Pending Approval',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <StatusBadge status="active" label="Online" />
      <StatusBadge status="inactive" label="Offline" />
      <StatusBadge status="pending" label="Loading" />
    </div>
  ),
};
