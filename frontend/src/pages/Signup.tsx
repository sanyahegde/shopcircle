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
    'w-full px-4 py-3 rounded-button border border-neutral-primary bg-sand-100 text-charcoal placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose transition-colors'

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto w-full">
        <Link to="/" className="text-xl font-semibold text-charcoal tracking-tight">
          shopcircle
        </Link>
        <Link
          to="/login"
          className="text-sand-500 text-sm font-medium hover:text-charcoal transition-colors"
        >
          log in
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-semibold text-charcoal mb-2">sign up</h1>
          <p className="text-sand-500 text-sm mb-8">
            create an account to save lists and share with your circle.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-sm text-charcoal bg-rose/15 rounded-button px-3 py-2">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-charcoal mb-1.5">
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
              <label htmlFor="signup-email" className="block text-sm font-medium text-charcoal mb-1.5">
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
              <label htmlFor="signup-password" className="block text-sm font-medium text-charcoal mb-1.5">
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
              className="w-full py-3 px-6 rounded-button bg-rose text-white text-sm font-medium hover:opacity-90 hover:shadow-card transition-all disabled:opacity-60"
            >
              {loading ? 'creating account…' : 'sign up'}
            </button>
          </form>
          <p className="mt-6 text-center text-sand-500 text-sm">
            have an account?{' '}
            <Link to="/login" className="text-rose font-medium hover:underline">
              log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
