import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'default' | 'lg'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'default',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200'

  const sizeStyles = size === 'lg' ? 'px-7 py-3 text-base' : 'px-5 py-2.5 text-sm'

  const variantStyles = {
    primary:
      'bg-green text-white border border-green hover:bg-green-hover hover:border-green-hover shadow-sm hover:shadow-md',
    outline: 'text-ink border border-line hover:border-green hover:text-green',
    ghost: 'text-muted hover:text-ink hover:bg-line/30',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClassName}>
        {children}
      </a>
    )
  }

  return (
    <button className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  )
}
