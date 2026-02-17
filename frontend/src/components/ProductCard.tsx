type ProductCardProps = {
  title?: string
  imageUrl?: string
  onAddToList?: () => void
}

export function ProductCard({ title, imageUrl, onAddToList }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      {imageUrl && (
        <div className="aspect-square overflow-hidden rounded-sm mb-3 bg-cream-100">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="space-y-1">
        {title && (
          <p className="text-sm lowercase text-warm-black font-light">{title}</p>
        )}
        {onAddToList && (
          <button
            type="button"
            onClick={onAddToList}
            className="text-sm lowercase text-warm-gray hover:text-warm-black transition-colors duration-300"
          >
            add to list
          </button>
        )}
      </div>
    </div>
  )
}
