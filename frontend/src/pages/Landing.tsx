import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Landing() {
  const navigate = useNavigate()
  const { continueAsGuest } = useAuth()

  function handleContinueAsGuest() {
    continueAsGuest()
    navigate('/home', { replace: true })
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="min-h-screen flex flex-col">
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

        <section className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-[48px] font-semibold text-charcoal text-center leading-tight max-w-2xl opacity-0 animate-fade-in-up">
          shop smarter with your circle
        </h1>
        <p className="mt-4 text-xl text-sand-500 text-center max-w-md opacity-0 animate-fade-in-up [animation-delay:0.15s] [animation-fill-mode:forwards]">
          your products, your way
        </p>
        <Link
          to="/signup"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-button bg-sand-300 text-charcoal font-medium hover:bg-sand-400 hover:shadow-card-hover transition-all duration-200 opacity-0 animate-fade-in-up [animation-delay:0.3s] [animation-fill-mode:forwards]"
        >
          start for free →
        </Link>
        </section>
      </div>

      <section
        id="get-started"
        className="border-t border-neutral-primary bg-neutral-bg/80 py-16 px-6 transition-all duration-300"
        aria-label="get started"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold text-charcoal mb-8">
            get started
          </h2>
          <div className="space-y-4">
            <Link
              to="/signup"
              className="block w-full py-3 px-6 rounded-button bg-rose text-white font-medium text-center hover:opacity-90 hover:shadow-card-hover transition-all"
            >
              sign up
            </Link>
            <p className="text-sand-500 text-sm">
              have an account?{' '}
              <Link to="/login" className="text-rose font-medium hover:underline">
                log in
              </Link>
            </p>
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="w-full py-3 px-6 rounded-button border border-neutral-primary text-sand-500 font-medium hover:border-sand-400 hover:text-charcoal transition-colors"
            >
              continue as guest
            </button>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-sand-500 text-sm">
        shopcircle — shop smarter with your circle
      </footer>
    </div>
  )
}
