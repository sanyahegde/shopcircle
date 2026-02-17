import { useParams } from 'react-router-dom'

export function ListDetail() {
  const { listId } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-charcoal mb-2">list</h1>
      <p className="text-sand-500">list id: {listId}. products and details will show here.</p>
    </div>
  )
}
