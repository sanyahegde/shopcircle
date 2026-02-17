type ProductCardProps = {
  title?: string
  imageUrl?: string
  onAddToList?: () => void
}

export function ProductCard({ title, imageUrl, onAddToList }: ProductCardProps) {
  return (
    <div className="rounded-card border border-neutral-primary bg-neutral-bg p-4 shadow-card hover:shadow-card-hover hover:border-sand-300 transition-all overflow-hidden">
      {imageUrl && (
        <div className="aspect-square bg-sand-100 rounded-button mb-4">
          <img src={imageUrl} alt="" className="w-full h-full object-cover rounded-button" />
        </div>
      )}
      <div>
        {title && <p className="font-medium text-charcoal">{title}</p>}
        {onAddToList && (
          <button
            type="button"
            onClick={onAddToList}
            className="mt-2 text-sm text-rose font-medium hover:underline"
          >
            add to list
          </button>
        )}
      </div>
    </div>
  )
}
