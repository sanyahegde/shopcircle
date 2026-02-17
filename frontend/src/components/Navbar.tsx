import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const navigate = useNavigate()
  const { user, isGuest, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-neutral-primary bg-cream/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/home" className="text-lg font-semibold text-charcoal tracking-tight">
          shopcircle
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/home"
            className="text-sm text-sand-500 hover:text-charcoal transition-colors"
          >
            home
          </Link>
          <Link
            to="/products"
            className="text-sm text-sand-500 hover:text-charcoal transition-colors"
          >
            my products
          </Link>
          <Link
            to="/lists"
            className="text-sm text-sand-500 hover:text-charcoal transition-colors"
          >
            lists
          </Link>
          <Link
            to="/friends"
            className="text-sm text-sand-500 hover:text-charcoal transition-colors"
          >
            friends
          </Link>
          <Link
            to="/profile"
            className="text-sm text-sand-500 hover:text-charcoal transition-colors"
          >
            profile
          </Link>
          <span className="text-sand-400">|</span>
          {isGuest ? (
            <span className="text-sm text-sand-500">guest</span>
          ) : (
            <span className="text-sm text-charcoal truncate max-w-[120px]">
              {user?.name ?? user?.email}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-rose font-medium hover:underline"
          >
            log out
          </button>
        </div>
      </div>
    </nav>
  )
}
