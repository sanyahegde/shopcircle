type CommentSectionProps = {
  productId?: string
  listId?: string
}

export function CommentSection({ productId, listId }: CommentSectionProps) {
  return (
    <div className="rounded-card border border-neutral-primary bg-neutral-bg p-4 shadow-card">
      <h3 className="font-medium text-charcoal mb-3">comments</h3>
      <p className="text-sm text-sand-500">
        comments for {productId ? `product ${productId}` : `list ${listId}`} will appear here.
      </p>
    </div>
  )
}
