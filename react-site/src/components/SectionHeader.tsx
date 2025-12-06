interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export default function SectionHeader({ children, className = '' }: SectionHeaderProps) {
  return (
    <h2
      className={`text-navy text-2xl font-semibold mt-12 mb-6 pb-2 border-b-2 border-border ${className}`}
    >
      {children}
    </h2>
  )
}
