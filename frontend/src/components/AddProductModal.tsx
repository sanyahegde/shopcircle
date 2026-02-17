type AddProductModalProps = {
  open: boolean
  onClose: () => void
}

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-4 bg-charcoal/30" onClick={onClose}>
      <div
        className="rounded-card bg-neutral-bg border border-neutral-primary shadow-card-hover max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-medium text-charcoal mb-4">add product</h2>
        <p className="text-sm text-sand-500 mb-4">paste a product url or search to add to your list.</p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-button border border-neutral-primary text-sand-500 hover:text-charcoal transition-colors"
          >
            cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-button bg-rose text-white text-sm font-medium hover:opacity-90"
          >
            add
          </button>
        </div>
      </div>
    </div>
  )
}
