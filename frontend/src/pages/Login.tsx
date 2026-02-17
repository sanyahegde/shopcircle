import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/home', { replace: true })
    } catch {
      setError('invalid email or password. please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-cream-100 border border-cream-200 rounded-sm px-4 py-3 text-sm lowercase text-warm-black placeholder:text-warm-gray focus:outline-none focus:border-cream-500 transition-colors duration-300'

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto w-full">
        <Link to="/" className="text-lg font-light lowercase tracking-wide text-warm-black">
          shopcircle
        </Link>
        <Link to="/signup" className="text-sm lowercase text-warm-gray hover:text-warm-black transition-colors duration-300">
          sign up
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-light lowercase text-warm-black mb-2">log in</h1>
          <p className="text-warm-gray text-sm mb-8">
            have an account? enter your details below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-sm text-warm-black bg-cream-200/50 rounded-sm px-3 py-2">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="login-email" className="block text-sm font-normal lowercase text-warm-black mb-1.5">
                email or username
              </label>
              <input
                id="login-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-normal lowercase text-warm-black mb-1.5">
                password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-6 rounded-sm bg-cream-500 text-white text-sm lowercase tracking-wide hover:opacity-90 transition-opacity duration-300 disabled:opacity-60"
            >
              {loading ? 'logging in…' : 'log in'}
            </button>
          </form>
          <p className="mt-8 text-center text-warm-gray text-sm">
            don't have an account?{' '}
            <Link to="/signup" className="text-warm-black hover:opacity-80 transition-opacity">
              sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
