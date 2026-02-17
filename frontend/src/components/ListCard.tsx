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
      className="block border border-cream-200 rounded p-4 bg-cream-50 hover:border-cream-300 transition-colors duration-300"
    >
      <p className="font-light text-warm-black lowercase">{title}</p>
      {itemCount != null && (
        <p className="text-sm text-warm-gray mt-1">{itemCount} items</p>
      )}
    </Link>
  )
}
