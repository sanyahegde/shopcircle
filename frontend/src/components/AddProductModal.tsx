type AddProductModalProps = {
  open: boolean
  onClose: () => void
}

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-4 bg-warm-black/20" onClick={onClose}>
      <div
        className="rounded bg-cream-50 border border-cream-200 max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-light lowercase text-warm-black mb-4">add product</h2>
        <p className="text-sm text-warm-gray mb-4">paste a product url or search to add to your list.</p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-sm border border-cream-200 text-warm-gray hover:bg-cream-100 transition-colors duration-300 text-sm lowercase"
          >
            cancel
          </button>
          <button
            type="button"
            className="px-4 py-2.5 rounded-sm bg-cream-500 text-white text-sm lowercase tracking-wide hover:opacity-90 transition-opacity duration-300"
          >
            add
          </button>
        </div>
      </div>
    </div>
  )
}
