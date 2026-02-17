import { useAuth } from '../context/AuthContext'

export function Home() {
  const { user, isGuest } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-medium text-charcoal mb-2">
        {isGuest ? 'welcome' : `hi, ${user?.name ?? 'there'}`}
      </h1>
      <p className="text-sand-500">
        your feed and shared lists from your circle will appear here.
      </p>
    </div>
  )
}
