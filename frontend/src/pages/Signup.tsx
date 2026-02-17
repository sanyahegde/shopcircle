import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(email, password, name || undefined)
      navigate('/home', { replace: true })
    } catch {
      setError('something went wrong. please try again.')
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
        <Link to="/login" className="text-sm lowercase text-warm-gray hover:text-warm-black transition-colors duration-300">
          log in
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-light lowercase text-warm-black mb-2">sign up</h1>
          <p className="text-warm-gray text-sm mb-8">
            create an account to save lists and share with your circle.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-sm text-warm-black bg-cream-200/50 rounded-sm px-3 py-2">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="signup-name" className="block text-sm font-normal lowercase text-warm-black mb-1.5">
                name (optional)
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className={inputClass}
                placeholder="your name"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-normal lowercase text-warm-black mb-1.5">
                email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-normal lowercase text-warm-black mb-1.5">
                password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
                className={inputClass}
                placeholder="at least 6 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-6 rounded-sm bg-cream-500 text-white text-sm lowercase tracking-wide hover:opacity-90 transition-opacity duration-300 disabled:opacity-60"
            >
              {loading ? 'creating account…' : 'create account'}
            </button>
          </form>
          <p className="mt-8 text-center text-warm-gray text-sm">
            have an account?{' '}
            <Link to="/login" className="text-warm-black hover:opacity-80 transition-opacity">
              log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
