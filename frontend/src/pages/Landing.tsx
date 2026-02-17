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
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <header className="fixed top-0 w-full bg-cream-50/90 backdrop-blur-md border-b border-cream-200 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-medium lowercase tracking-wide text-warm-black hover:text-cream-500 transition-colors duration-300">
            shopcircle
          </Link>
          <Link to="/login" className="text-sm lowercase text-warm-gray hover:text-warm-black transition-colors duration-300">
            log in
          </Link>
        </div>
      </header>

      {/* First screen: full hero — "the shop" */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase text-warm-black mb-3 tracking-tight opacity-0 animate-fade-in-up">
            shop smarter with your circle
          </h1>
          <p className="text-lg font-light lowercase text-warm-gray mb-6 opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            your products, your way
          </p>
          <Link
            to="/signup"
            className="inline-block bg-cream-500 text-white px-6 py-2.5 text-sm lowercase tracking-wide hover:opacity-90 transition-opacity duration-300 rounded-sm opacity-0 animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:forwards]"
          >
            start for free →
          </Link>
        </div>
      </section>

      {/* Scroll: made yours */}
      <section className="py-16 px-6 border-t border-cream-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="flex-1">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-warm-black lowercase tracking-tight leading-tight">
              <span className="block text-2xl md:text-3xl text-warm-gray">made</span>
              yours
            </h2>
          </div>
          <div className="flex-1 max-w-md border-l-2 border-cream-200 pl-6">
            <p className="font-sans text-warm-black/90 text-base leading-relaxed lowercase">
              the difference is in the details. a shared list, a real opinion from someone you trust, a find your circle actually loves. personal style isn’t just what you buy—it’s what you share.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll: you new here? */}
      <section
        id="get-started"
        className="border-t border-cream-200 bg-cream-100 py-14 px-6"
        aria-label="you new here"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-light lowercase text-warm-black mb-6">
            you new here?
          </h2>
          <div className="space-y-3">
            <Link
              to="/signup"
              className="block w-full py-2.5 px-6 rounded-sm bg-cream-500 text-white text-sm lowercase tracking-wide hover:opacity-90 transition-opacity duration-300 text-center"
            >
              sign up
            </Link>
            <p className="text-sm text-warm-gray">
              have an account?{' '}
              <Link to="/login" className="text-cream-500 hover:opacity-80 transition-opacity duration-300">
                log in
              </Link>
            </p>
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="w-full py-2.5 px-6 rounded-sm bg-transparent text-warm-black border border-cream-200 text-sm lowercase hover:bg-cream-200/50 transition-colors duration-300"
            >
              continue as guest
            </button>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-warm-gray text-sm border-t border-cream-200">
        shopcircle — shop smarter with your circle
      </footer>
    </div>
  )
}
