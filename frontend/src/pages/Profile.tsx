import { useAuth } from '../context/AuthContext'

export function Profile() {
  const { user, isGuest } = useAuth()

  return (
    <div>
      <h1 className="text-4xl font-light lowercase text-warm-black mb-3">profile</h1>
      {isGuest ? (
        <p className="text-warm-gray">you're browsing as a guest. sign up to save your data.</p>
      ) : (
        <p className="text-warm-gray">
          {user?.name && <span>{user.name} — </span>}
          {user?.email}
        </p>
      )}
    </div>
  )
}
