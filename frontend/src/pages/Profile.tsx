import { useAuth } from '../context/AuthContext'

export function Profile() {
  const { user, isGuest } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-charcoal mb-2">profile</h1>
      {isGuest ? (
        <p className="text-sand-500">you're browsing as a guest. sign up to save your data.</p>
      ) : (
        <p className="text-sand-500">
          {user?.name && <span>{user.name} — </span>}
          {user?.email}
        </p>
      )}
    </div>
  )
}
