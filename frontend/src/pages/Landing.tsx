import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BuildReceipt } from '../components/BuildReceipt'

export function Landing() {
  const navigate = useNavigate()
  const { continueAsGuest } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [buildTrigger, setBuildTrigger] = useState(0)
  const getStartedRef = useRef<HTMLElement>(null)
  const buildReceiptRef = useRef<HTMLElement>(null)

  function handleContinueAsGuest() {
    continueAsGuest()
    navigate('/home', { replace: true })
  }

  function scrollToGetStarted() {
    getStartedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleBuildReceipt(e: React.FormEvent) {
    e.preventDefault()
    setBuildTrigger(Date.now())
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col relative overflow-x-hidden">
      {/* Faded background: receipt strips only */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        {/* Floating receipt strips */}
        {[
          { delay: '0s', left: '8%', w: '120px', duration: '28s' },
          { delay: '4s', left: '22%', w: '80px', duration: '32s' },
          { delay: '8s', left: '45%', w: '100px', duration: '26s' },
          { delay: '2s', left: '68%', w: '90px', duration: '30s' },
          { delay: '6s', left: '85%', w: '70px', duration: '34s' },
          { delay: '10s', left: '15%', w: '60px', duration: '29s' },
          { delay: '3s', left: '55%', w: '110px', duration: '27s' },
          { delay: '7s', left: '78%', w: '85px', duration: '31s' },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute bottom-0 h-3 rounded-sm bg-cream-300/40 border border-cream-200/50 animate-float-up"
            style={{
              left: r.left,
              width: r.w,
              animationDelay: r.delay,
              animationDuration: r.duration,
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 w-full bg-cream-50/90 backdrop-blur-md border-b border-cream-200 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-medium lowercase tracking-wide text-warm-black hover:text-cream-500 transition-colors duration-300">
            shopcircle
          </Link>
          <nav className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToGetStarted}
              className="text-sm lowercase text-warm-gray hover:text-warm-black transition-colors duration-300"
            >
              get started
            </button>
            <Link to="/login" className="text-sm lowercase text-warm-gray hover:text-warm-black transition-colors duration-300">
              log in
            </Link>
          </nav>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase text-warm-black mb-3 tracking-tight opacity-0 animate-fade-in-up">
            shop smarter with your circle
          </h1>
          <p className="text-lg font-light lowercase text-warm-gray mb-8 opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            your products, your way
          </p>
          <button
            type="button"
            onClick={scrollToGetStarted}
            className="inline-block bg-cream-500 text-white px-6 py-2.5 text-sm lowercase tracking-wide hover:opacity-90 transition-opacity duration-300 rounded-sm opacity-0 animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:forwards]"
          >
            get started
          </button>
        </div>
      </section>

      {/* 2. Get started — with sign up / log in / guest throughout */}
      <section
        ref={getStartedRef}
        id="get-started"
        className="border-t border-cream-200 bg-cream-100 py-16 px-6 scroll-mt-4 relative z-10"
        aria-label="get started"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-light lowercase text-warm-black mb-3">
            get started
          </h2>
          <p className="text-warm-gray text-sm lowercase mb-8 max-w-md mx-auto">
            thanks for checking us out. sign up below or build a receipt at the end — hope to see you again.
          </p>
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

      {/* 3. Build a receipt — last, receipt is leaving us ♡ */}
      <section
        ref={buildReceiptRef}
        id="build-receipt"
        className="py-16 px-6 border-t border-cream-200 bg-cream-50/80 scroll-mt-4 relative z-10"
        aria-label="build a receipt"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light lowercase text-warm-black mb-10">
            build a receipt
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: form */}
            <div>
              <form onSubmit={handleBuildReceipt} className="flex flex-col gap-4 w-full max-w-[280px]">
                <div>
                  <label htmlFor="first-name" className="block text-sm text-warm-black lowercase mb-1.5">
                    first name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="your first name"
                    className="w-full bg-cream-100 border border-cream-200 rounded-sm px-3 py-2.5 text-sm lowercase text-warm-black placeholder:text-warm-gray focus:outline-none focus:border-cream-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm text-warm-black lowercase mb-1.5">
                    last name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="your last name"
                    className="w-full bg-cream-100 border border-cream-200 rounded-sm px-3 py-2.5 text-sm lowercase text-warm-black placeholder:text-warm-gray focus:outline-none focus:border-cream-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-sm border border-cream-300 text-warm-black text-sm lowercase tracking-wide hover:bg-cream-100 hover:border-cream-400 transition-all duration-300 w-fit"
                >
                  build your receipt
                </button>
              </form>
              <p className="text-warm-gray text-sm lowercase mt-8">
                hope to see you again ♡
              </p>
            </div>

            {/* Right: receipt */}
            <div className="lg:flex lg:justify-end">
              <div className="inline-block">
                <p className="text-warm-gray text-sm lowercase mb-4 font-sans">
                  made yours ♡
                </p>
                <BuildReceipt
                  firstName={firstName}
                  lastName={lastName}
                  buildTrigger={buildTrigger}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-warm-gray text-sm border-t border-cream-200 relative z-10">
        shopcircle — shop smarter with your circle
      </footer>
    </div>
  )
}
