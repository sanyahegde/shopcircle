import { useAuth } from '../context/AuthContext'

export function Home() {
  const { user, isGuest } = useAuth()

  return (
    <div>
      <h1 className="text-4xl font-light lowercase text-warm-black mb-3">
        {isGuest ? 'welcome' : `hi, ${user?.name ?? 'there'}`}
      </h1>
      <p className="text-warm-gray">
        your feed and shared lists from your circle will appear here.
      </p>
    </div>
  )
}
