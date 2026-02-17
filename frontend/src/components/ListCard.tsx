import { Link } from 'react-router-dom'

type ListCardProps = {
  id: string
  title: string
  itemCount?: number
}

export function ListCard({ id, title, itemCount }: ListCardProps) {
  return (
    <Link
      to={`/lists/${id}`}
      className="block rounded-card border border-neutral-primary bg-neutral-bg p-4 shadow-card hover:shadow-card-hover hover:border-sand-300 transition-all"
    >
      <p className="font-medium text-charcoal">{title}</p>
      {itemCount != null && (
        <p className="text-sm text-sand-500 mt-1">{itemCount} items</p>
      )}
    </Link>
  )
}
