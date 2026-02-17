/** Small decorative record player - vinyl spins */
export function RecordPlayer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden>
      {/* base */}
      <div className="absolute bottom-0 w-14 h-6 rounded-sm bg-cream-300 border border-cream-400" />
      {/* arm */}
      <div className="absolute top-2 right-0 w-8 h-1 bg-cream-400 rounded-full origin-right rotate-[-20deg]" />
      {/* vinyl + label - spinning */}
      <div className="animate-spin-slow w-12 h-12 rounded-full border-4 border-warm-black/80 bg-gradient-to-br from-warm-black/90 to-warm-black/70 flex items-center justify-center shadow-inner">
        <div className="w-4 h-4 rounded-full bg-cream-100 border-2 border-cream-300" />
      </div>
    </div>
  )
}
