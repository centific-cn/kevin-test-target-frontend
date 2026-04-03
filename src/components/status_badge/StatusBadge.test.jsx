import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'

describe('StatusBadge', () => {
  describe('active status', () => {
    it('should render with active status dot', () => {
      render(<StatusBadge status="active" label="Active User" />)
      expect(screen.getByText('Active User')).toBeInTheDocument()
    })

    it('should have active dot class', () => {
      const { container } = render(<StatusBadge status="active" label="Active" />)
      const dot = container.querySelector('[class*="dotActive"]')
      expect(dot).toBeInTheDocument()
    })
  })

  describe('inactive status', () => {
    it('should render with inactive status dot', () => {
      render(<StatusBadge status="inactive" label="Inactive User" />)
      expect(screen.getByText('Inactive User')).toBeInTheDocument()
    })

    it('should have inactive dot class', () => {
      const { container } = render(<StatusBadge status="inactive" label="Inactive" />)
      const dot = container.querySelector('[class*="dotInactive"]')
      expect(dot).toBeInTheDocument()
    })
  })

  describe('pending status', () => {
    it('should render with pending status dot', () => {
      render(<StatusBadge status="pending" label="Pending Approval" />)
      expect(screen.getByText('Pending Approval')).toBeInTheDocument()
    })

    it('should have pending dot class', () => {
      const { container } = render(<StatusBadge status="pending" label="Pending" />)
      const dot = container.querySelector('[class*="dotPending"]')
      expect(dot).toBeInTheDocument()
    })
  })

  describe('component structure', () => {
    it('should render a dot element', () => {
      const { container } = render(<StatusBadge status="active" label="Test" />)
      const dot = container.querySelector('[class*="dot"]')
      expect(dot).toBeInTheDocument()
    })

    it('should render the label text', () => {
      render(<StatusBadge status="active" label="Custom Label" />)
      expect(screen.getByText('Custom Label')).toBeInTheDocument()
    })
  })
})
