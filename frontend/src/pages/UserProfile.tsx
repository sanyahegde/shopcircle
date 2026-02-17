import { useParams } from 'react-router-dom'

export function UserProfile() {
  const { userId } = useParams()

  return (
    <div>
      <h1 className="text-4xl font-light lowercase text-warm-black mb-3">profile</h1>
      <p className="text-warm-gray">user id: {userId}. their profile and shared lists will show here.</p>
    </div>
  )
}
