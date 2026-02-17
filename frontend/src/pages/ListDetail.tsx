import { useParams } from 'react-router-dom'

export function ListDetail() {
  const { listId } = useParams()

  return (
    <div>
      <h1 className="text-4xl font-light lowercase text-warm-black mb-3">list</h1>
      <p className="text-warm-gray">list id: {listId}. products and details will show here.</p>
    </div>
  )
}
