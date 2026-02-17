import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFriends } from '../context/FriendsContext'

const displayName = (user: { name?: string; email: string } | null) =>
  user?.name?.trim() || user?.email?.split('@')[0] || 'you'
const initials = (user: { name?: string; email: string } | null) => {
  const n = displayName(user)
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toLowerCase().slice(0, 2)
  return n.slice(0, 2).toLowerCase()
}

export function Profile() {
  const { user, isGuest } = useAuth()
  const { friends, followingList, followersList } = useFriends()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="max-w-2xl">
      {/* Profile card — who you are at a glance */}
      <div className="bg-cream-50 border border-cream-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-warm-black text-2xl font-light shrink-0">
            {isGuest ? '?' : initials(user)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-light lowercase text-warm-black truncate">
              {isGuest ? 'guest' : displayName(user)}
            </h1>
            {!isGuest && user?.email && (
              <p className="text-warm-gray text-sm lowercase truncate mt-0.5">{user.email}</p>
            )}
            {isGuest && (
              <p className="text-warm-gray text-sm mt-1">
                you're browsing as a guest.{' '}
                <Link to="/signup" className="text-cream-500 hover:opacity-80 transition-opacity">
                  sign up
                </Link>
                {' '}to save your data.
              </p>
            )}
          </div>
          {!isGuest && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-sm border border-cream-200 text-warm-black text-sm lowercase hover:bg-cream-100 transition-colors"
                aria-label="open settings"
              >
                <svg className="w-4 h-4 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                settings
              </button>
            </div>
          )}
        </div>
      </div>

      {!isGuest && (
        <>
          {/* Your circle — clear section with one action */}
          <section className="mb-8" aria-label="your circle">
            <h2 className="text-sm font-medium text-warm-gray lowercase mb-3">your circle</h2>
            <div className="bg-cream-50 border-2 border-cream-300 rounded-lg p-4 ring-1 ring-cream-200/50 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm text-warm-black lowercase">
                <span><strong className="font-medium">{followersList.length}</strong> followers</span>
                <span><strong className="font-medium">{followingList.length}</strong> following</span>
                <span><strong className="font-medium">{friends.length}</strong> friends</span>
              </div>
              <p className="text-warm-gray text-sm mt-2 mb-3">
                friends are people you follow who follow you back.
              </p>
              <Link
                to="/friends"
                className="inline-flex items-center gap-1 text-sm text-cream-500 lowercase hover:opacity-80 transition-opacity"
              >
                manage circle
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          {/* Quick links — where to go next */}
          <section aria-label="quick links">
            <h2 className="text-sm font-medium text-warm-gray lowercase mb-3">quick links</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/lists"
                className="px-4 py-2 rounded-sm border border-cream-200 text-warm-black text-sm lowercase hover:bg-cream-100 transition-colors"
              >
                my lists
              </Link>
              <Link
                to="/products"
                className="px-4 py-2 rounded-sm border border-cream-200 text-warm-black text-sm lowercase hover:bg-cream-100 transition-colors"
              >
                my products
              </Link>
            </div>
          </section>
        </>
      )}

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(true)
  const [showActivity, setShowActivity] = useState(true)
  const [emailDigest, setEmailDigest] = useState<'off' | 'daily' | 'weekly'>('weekly')

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <>
      <div
        className="fixed inset-0 bg-warm-black/20 z-40"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 border-l border-cream-200 shadow-xl z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-cream-200">
          <h2 className="text-xl font-light lowercase text-warm-black">settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-sm text-warm-gray hover:text-warm-black hover:bg-cream-100 transition-colors"
            aria-label="close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          {/* Account */}
          <section>
            <h3 className="text-sm font-medium text-warm-black lowercase mb-3">account</h3>
            <div className="space-y-3 text-sm">
              <p className="text-warm-gray">name and email are managed by your account. sign out and back in to change them.</p>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h3 className="text-sm font-medium text-warm-black lowercase mb-3">notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="text-warm-black lowercase">push notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4 rounded border-cream-300 text-cream-500 focus:ring-cream-500"
                />
              </label>
              <label className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="text-warm-black lowercase">show activity in circle</span>
                <input
                  type="checkbox"
                  checked={showActivity}
                  onChange={(e) => setShowActivity(e.target.checked)}
                  className="w-4 h-4 rounded border-cream-300 text-cream-500 focus:ring-cream-500"
                />
              </label>
            </div>
          </section>

          {/* Email */}
          <section>
            <h3 className="text-sm font-medium text-warm-black lowercase mb-3">email digest</h3>
            <div className="space-y-2">
              <p className="text-warm-gray text-sm mb-2">how often to get a summary of your circle’s activity.</p>
              <select
                value={emailDigest}
                onChange={(e) => setEmailDigest(e.target.value as 'off' | 'daily' | 'weekly')}
                className="w-full bg-cream-100 border border-cream-200 rounded-sm px-3 py-2 text-sm lowercase text-warm-black focus:outline-none focus:border-cream-500"
              >
                <option value="off">off</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
              </select>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h3 className="text-sm font-medium text-warm-black lowercase mb-3">privacy</h3>
            <div className="space-y-2 text-sm text-warm-gray">
              <p>your lists can be shared with friends you add. only people you follow can see your activity.</p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
