import { render, screen } from '@testing-library/react'
import UserCard from './UserCard'

describe('UserCard', () => {
  const defaultProps = {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Software developer passionate about React.',
  }

  it('should render with all props provided', () => {
    render(<UserCard {...defaultProps} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Software developer passionate about React.')).toBeInTheDocument()
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
  })

  it('should render the name correctly', () => {
    render(<UserCard name="Jane Smith" />)

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('should render the bio correctly', () => {
    render(<UserCard name="Jane Smith" bio="Frontend engineer" />)

    expect(screen.getByText('Frontend engineer')).toBeInTheDocument()
  })

  it('should render avatar image when URL is provided', () => {
    render(<UserCard name="John Doe" avatar="https://example.com/avatar.jpg" />)

    const avatar = screen.getByTestId('user-avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    expect(avatar).toHaveAttribute('alt', "John Doe's avatar")
  })

  it('should render placeholder when avatar is missing', () => {
    render(<UserCard name="John Doe" />)

    const placeholder = screen.getByTestId('avatar-placeholder')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveTextContent('JD')
  })

  it('should render placeholder when avatar is empty string', () => {
    render(<UserCard name="Jane Smith" avatar="" />)

    const placeholder = screen.getByTestId('avatar-placeholder')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveTextContent('JS')
  })

  it('should handle empty bio gracefully', () => {
    render(<UserCard name="John Doe" avatar="https://example.com/avatar.jpg" />)

    expect(screen.queryByTestId('user-bio')).not.toBeInTheDocument()
  })

  it('should render placeholder with initials from single name', () => {
    render(<UserCard name="Madonna" />)

    const placeholder = screen.getByTestId('avatar-placeholder')
    expect(placeholder).toHaveTextContent('M')
  })

  it('should limit placeholder initials to 2 characters for multi-word names', () => {
    render(<UserCard name="John Michael Doe" />)

    const placeholder = screen.getByTestId('avatar-placeholder')
    expect(placeholder).toHaveTextContent('JM')
  })
})
