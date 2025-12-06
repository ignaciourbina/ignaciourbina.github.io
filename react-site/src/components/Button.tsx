import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'outline' | 'outline-secondary'
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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200'
  
  const sizeStyles = size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
  
  const variantStyles = {
    primary: 'bg-accent text-white border border-accent hover:bg-accent-light hover:border-accent-light',
    outline: 'text-white border border-white/50 hover:bg-white/10 hover:border-white',
    'outline-secondary': 'text-slate border border-border hover:bg-bg-light hover:border-slate',
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
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
