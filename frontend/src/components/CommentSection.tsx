type CommentSectionProps = {
  productId?: string
  listId?: string
}

export function CommentSection({ productId, listId }: CommentSectionProps) {
  return (
    <div className="border border-cream-200 rounded p-4 bg-cream-50">
      <h3 className="font-light text-warm-black lowercase mb-3">comments</h3>
      <p className="text-sm text-warm-gray">
        comments for {productId ? `product ${productId}` : `list ${listId}`} will appear here.
      </p>
    </div>
  )
}
