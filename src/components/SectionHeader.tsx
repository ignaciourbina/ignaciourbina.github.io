interface SectionHeaderProps {
  children: React.ReactNode
  kicker?: string
  className?: string
}

export default function SectionHeader({ children, kicker, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mt-16 mb-8 ${className}`}>
      {kicker && (
        <span className="text-xs font-bold uppercase tracking-widest text-green mb-2 block">
          {kicker}
        </span>
      )}
      <h2 className="text-ink text-2xl font-bold leading-tight">{children}</h2>
    </div>
  )
}
