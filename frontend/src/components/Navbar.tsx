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
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-cream-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/home" className="text-lg font-light lowercase tracking-wide text-warm-black">
          shopcircle
        </Link>
        <div className="flex items-center gap-8 text-sm lowercase text-warm-gray">
          <Link to="/home" className="hover:text-warm-black transition-colors duration-300">
            home
          </Link>
          <Link to="/products" className="hover:text-warm-black transition-colors duration-300">
            my products
          </Link>
          <Link to="/lists" className="hover:text-warm-black transition-colors duration-300">
            lists
          </Link>
          <Link to="/friends" className="hover:text-warm-black transition-colors duration-300">
            friends
          </Link>
          <Link to="/profile" className="hover:text-warm-black transition-colors duration-300">
            profile
          </Link>
          <span className="text-cream-300">|</span>
          {isGuest ? (
            <span className="text-warm-gray">guest</span>
          ) : (
            <span className="text-warm-black truncate max-w-[120px]">
              {user?.name ?? user?.email}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="text-warm-gray hover:text-warm-black transition-colors duration-300"
          >
            log out
          </button>
        </div>
      </div>
    </nav>
  )
}
