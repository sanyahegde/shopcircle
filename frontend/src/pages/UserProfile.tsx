import { useParams } from 'react-router-dom'

export function UserProfile() {
  const { userId } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-charcoal mb-2">profile</h1>
      <p className="text-sand-500">user id: {userId}. their profile and shared lists will show here.</p>
    </div>
  )
}
