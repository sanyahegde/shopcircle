import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFriends } from '../context/FriendsContext'
import { useAuth } from '../context/AuthContext'
import type { FriendUser } from '../context/FriendsContext'

/** Mock: per-user stats for storefront (no backend yet) */
function mockStatsForUser(userId: string) {
  const n = userId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return {
    followers: (n % 200) + 80,
    following: (n % 150) + 50,
    products: (n % 300) + 50,
    collections: (n % 10) + 4,
  }
}

function initials(user: FriendUser) {
  const parts = user.name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toLowerCase().slice(0, 2)
  return user.name.slice(0, 2).toLowerCase()
}

/** Mock collections for profile storefront */
const MOCK_COLLECTIONS = [
  { id: '1', label: 'morning routine', count: 18, emojis: ['🧴', '✨', '🌿'] },
  { id: '2', label: 'quiet luxury', count: 34, emojis: ['👟', '🤍', '🧥'] },
  { id: '3', label: 'desk setup', count: 12, emojis: ['💻', '🎧', '🖋️'] },
  { id: '4', label: 'night routine', count: 9, emojis: ['🌙', '🕯️', '🛁'] },
]

/** Mock products for profile grid — with save counts for social feel */
const MOCK_PRODUCTS = [
  { id: '1', brand: 'glossier', name: 'you solid perfume', price: '$22', badge: 'purchased', emoji: '🧴', saves: 24 },
  { id: '2', brand: 'new balance', name: '327 in cream', price: '$110', badge: null, emoji: '👟', saves: 12 },
  { id: '3', brand: 'rhode', name: 'peptide lip treatment', price: '$16', badge: 'trending', emoji: '✨', saves: 89 },
  { id: '4', brand: 'aesop', name: 'aromatique candle', price: '$80', badge: null, emoji: '🕯️', saves: 31 },
  { id: '5', brand: 'apple', name: 'airpods pro (2nd gen)', price: '$249', badge: 'purchased', emoji: '🎧', saves: 156 },
  { id: '6', brand: 'cos', name: 'relaxed linen blazer', price: '$185', badge: null, emoji: '🧥', saves: 8 },
]

/** Mock AI recommendations */
const MOCK_AI_PRODUCTS = [
  { id: '1', name: 'laneige lip mask', price: '$24 · laneige', emoji: '🌿' },
  { id: '2', name: 'mini tote in sand', price: '$68 · toteme', emoji: '👜' },
  { id: '3', name: 'ceramic mug set', price: '$42 · fable', emoji: '☕' },
  { id: '4', name: 'linen journal', price: '$28 · appointed', emoji: '📓' },
]

const SWATCH_CLASSES = [
  'bg-gradient-to-br from-cream-200 to-cream-400',
  'bg-gradient-to-br from-cream-100 to-cream-300',
  'bg-gradient-to-br from-cream-50 to-cream-200',
  'bg-gradient-to-br from-cream-300 to-cream-500',
  'bg-gradient-to-br from-cream-200 to-cream-300',
  'bg-gradient-to-br from-cream-100 to-cream-400',
]

type ProductItem = (typeof MOCK_PRODUCTS)[number]

function ProductCard({ product: p, index: i }: { product: ProductItem; index: number }) {
  return (
    <div className="group">
      <div className="aspect-square rounded-xl overflow-hidden bg-cream-100 relative ring-1 ring-cream-200/80 hover:ring-cream-300 transition-all duration-200">
        <div className={`w-full h-full flex items-center justify-center text-4xl ${SWATCH_CLASSES[i % SWATCH_CLASSES.length]} group-hover:scale-105 transition-transform duration-300 ease-out`}>
          {p.emoji}
        </div>
        {p.badge && (
          <span className="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wider bg-white/95 backdrop-blur-sm text-cream-500 px-2 py-0.5 rounded-full">
            {p.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white text-xs font-medium drop-shadow-sm">♡ {p.saves}</span>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm hover:bg-white transition-colors"
            aria-label="save"
          >
            ♡
          </button>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <div className="text-[11px] font-light text-warm-gray uppercase tracking-wide truncate">{p.brand}</div>
        <div className="text-[13px] font-normal text-warm-black lowercase truncate">{p.name} · {p.price}</div>
      </div>
    </div>
  )
}

export function UserProfile() {
  const { userId } = useParams()
  const { user: currentUser } = useAuth()
  const { allUsers, isFollowing, follow, unfollow } = useFriends()

  const userFromList = userId ? allUsers.find((u) => u.id === userId) : null
  const ownProfileUser =
    currentUser && userId && currentUser.id === userId
      ? { id: currentUser.id, name: currentUser.name || currentUser.email.split('@')[0], username: currentUser.email.split('@')[0] }
      : null
  const profileUser = userFromList ?? ownProfileUser
  const stats = userId ? mockStatsForUser(userId) : { followers: 0, following: 0, products: 0, collections: 0 }
  const following = userId ? isFollowing(userId) : false
  const isOwnProfile = Boolean(currentUser && profileUser && currentUser.id === profileUser.id)

  const [activeTab, setActiveTab] = useState<'products' | 'collections' | 'purchased' | 'saved'>('products')

  if (!userId) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 pt-6">
        <p className="text-warm-gray">no user selected.</p>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 pt-6">
        <p className="text-warm-gray">user not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-[600px] sm:max-w-[1100px] mx-auto px-4 sm:px-6 pb-20">
      {/* Profile header — social style: avatar + stats row, then name & bio */}
      <header className="pt-6 sm:pt-8 pb-6 border-b border-cream-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cream-200 border-2 border-cream-200 flex items-center justify-center text-cream-500 text-2xl sm:text-3xl font-light overflow-hidden shrink-0 ring-2 ring-white shadow-sm">
              {initials(profileUser)}
            </div>
            <div className="flex sm:hidden flex-col gap-1">
              <h1 className="font-display text-xl font-normal text-warm-black tracking-tight lowercase">{profileUser.name}</h1>
              <span className="text-sm font-light text-warm-gray lowercase">@{profileUser.username}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="hidden sm:block mb-3">
              <h1 className="font-display text-2xl font-normal text-warm-black tracking-tight lowercase">{profileUser.name}</h1>
              <span className="text-sm font-light text-warm-gray lowercase">@{profileUser.username}</span>
            </div>
            <div className="flex items-center gap-6 sm:gap-8 mb-4">
              <span className="text-warm-black font-semibold">{stats.products} <span className="font-normal text-warm-gray text-sm">products</span></span>
              <span className="text-warm-black font-semibold">{stats.followers} <span className="font-normal text-warm-gray text-sm">followers</span></span>
              <span className="text-warm-black font-semibold">{stats.following} <span className="font-normal text-warm-gray text-sm">following</span></span>
            </div>
            <p className="text-sm font-light text-warm-black leading-relaxed mb-4 max-w-md">
              cs student · minimal wardrobe, intentional living · curating things i actually use and love
            </p>
            <div className="flex flex-wrap gap-2">
              {isOwnProfile ? (
                <>
                  <Link to="/profile" className="px-4 py-2 rounded-lg bg-warm-black text-white text-sm font-medium hover:bg-espresso transition-colors">
                    edit profile
                  </Link>
                  <button type="button" className="px-4 py-2 rounded-lg border border-cream-300 text-warm-black text-sm font-medium hover:bg-cream-100 transition-colors">
                    share
                  </button>
                </>
              ) : (
                <>
                  {following ? (
                    <button type="button" onClick={() => unfollow(profileUser.id)} className="px-4 py-2 rounded-lg border border-cream-300 text-warm-black text-sm font-medium hover:bg-cream-100 transition-colors">
                      following
                    </button>
                  ) : (
                    <button type="button" onClick={() => follow(profileUser.id)} className="px-4 py-2 rounded-lg bg-warm-black text-white text-sm font-medium hover:bg-espresso transition-colors">
                      follow
                    </button>
                  )}
                  <button type="button" className="px-4 py-2 rounded-lg border border-cream-300 text-warm-black text-sm font-medium hover:bg-cream-100 transition-colors">
                    share
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['skincare', 'minimal fashion', 'tech', 'home', 'wellness'].map((tag) => (
                <span key={tag} className="text-xs font-normal text-cream-500 bg-cream-100 px-2.5 py-1 rounded-full lowercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Tabs — feed style */}
      <div className="flex justify-center gap-0 border-b border-cream-200 mb-6">
        {(['products', 'collections', 'purchased', 'saved'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium px-6 py-3 border-b-2 transition-colors lowercase -mb-px ${
              activeTab === tab ? 'text-warm-black border-warm-black' : 'text-warm-gray border-transparent hover:text-warm-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'products' && (
        <>
          {/* Collections row — 4 cards, 2×2 image mosaic, label + count */}
          <div className="flex items-baseline justify-between mb-5">
            <span className="text-[13px] font-normal text-warm-gray uppercase tracking-[0.05em]">collections</span>
            <Link to={`/user/${userId}/collections`} className="text-xs font-normal text-warm-gray hover:text-warm-black transition-colors">
              see all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-12">
            {MOCK_COLLECTIONS.map((col, i) => (
              <button key={col.id} type="button" className="text-left group hover:opacity-90 active:scale-[0.98] transition-all">
                <div className="aspect-[1/1.1] rounded-xl overflow-hidden mb-2 grid grid-cols-2 grid-rows-2 gap-[2px] bg-cream-200 ring-1 ring-cream-200/80">
                  <div className={`${SWATCH_CLASSES[i % SWATCH_CLASSES.length]} flex items-center justify-center text-2xl sm:text-[28px] col-span-1 row-span-2`}>{col.emojis[0]}</div>
                  <div className={`${SWATCH_CLASSES[(i + 1) % SWATCH_CLASSES.length]} flex items-center justify-center text-lg sm:text-xl`}>{col.emojis[1]}</div>
                  <div className={`${SWATCH_CLASSES[(i + 2) % SWATCH_CLASSES.length]} flex items-center justify-center text-lg sm:text-xl`}>{col.emojis[2]}</div>
                </div>
                <div className="text-[13px] font-normal text-warm-black lowercase tracking-wide">{col.label}</div>
                <div className="text-[11px] font-light text-warm-gray">{col.count} products</div>
              </button>
            ))}
          </div>
          <div className="w-full h-px bg-cream-200 my-2 mb-12" />
          {/* All products grid */}
          <div className="flex items-baseline justify-between mb-5">
            <span className="text-[13px] font-normal text-warm-gray uppercase tracking-[0.05em]">all products</span>
            <span className="text-xs font-light text-warm-gray">{stats.products} items</span>
          </div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-14">
            {MOCK_PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'collections' && (
        <>
          <div className="flex items-baseline justify-between mb-5">
            <span className="text-[13px] font-normal text-warm-gray uppercase tracking-[0.05em]">collections</span>
            <Link to={`/user/${userId}/collections`} className="text-xs font-normal text-warm-gray hover:text-warm-black transition-colors">see all →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-14">
            {MOCK_COLLECTIONS.map((col, i) => (
              <button key={col.id} type="button" className="text-left group hover:opacity-80 transition-opacity">
                <div className="aspect-[1/1.1] rounded-[3px] overflow-hidden mb-2.5 grid grid-cols-2 grid-rows-2 gap-[2px] bg-cream-200">
                  <div className={`${SWATCH_CLASSES[i % SWATCH_CLASSES.length]} flex items-center justify-center text-2xl sm:text-[28px] col-span-1 row-span-2`}>{col.emojis[0]}</div>
                  <div className={`${SWATCH_CLASSES[(i + 1) % SWATCH_CLASSES.length]} flex items-center justify-center text-lg sm:text-xl`}>{col.emojis[1]}</div>
                  <div className={`${SWATCH_CLASSES[(i + 2) % SWATCH_CLASSES.length]} flex items-center justify-center text-lg sm:text-xl`}>{col.emojis[2]}</div>
                </div>
                <div className="text-[13px] font-normal text-warm-black lowercase tracking-wide">{col.label}</div>
                <div className="text-[11px] font-light text-warm-gray">{col.count} products</div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeTab === 'purchased' && (
        <>
          <div className="flex items-baseline justify-between mb-5">
            <span className="text-[13px] font-normal text-warm-gray uppercase tracking-[0.05em]">purchased</span>
            <span className="text-xs font-light text-warm-gray">{MOCK_PRODUCTS.filter((p) => p.badge === 'purchased').length} items</span>
          </div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-14">
            {MOCK_PRODUCTS.filter((p) => p.badge === 'purchased').map((p) => (
              <ProductCard key={p.id} product={p} index={MOCK_PRODUCTS.indexOf(p)} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'saved' && (
        <div className="py-16 text-center mb-14">
          <p className="text-warm-gray text-sm mb-2">saved items will appear here</p>
          <p className="text-warm-gray text-xs">tap the ♡ on any product to save it</p>
        </div>
      )}

      {/* Curated for you — social-style card strip */}
      <section className="bg-cream-100/80 border border-cream-200 rounded-2xl py-5 px-4 sm:px-6 mb-10">
        <div className="text-[10px] font-medium uppercase tracking-wider text-cream-500 mb-1">curated for you</div>
        <div className="text-sm font-light text-warm-black mb-4">based on what you love</div>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {MOCK_AI_PRODUCTS.map((p, i) => (
            <button key={p.id} type="button" className="flex-shrink-0 w-[120px] text-left hover:opacity-90 transition-opacity">
              <div className={`aspect-square rounded-xl flex items-center justify-center text-2xl mb-1.5 ring-1 ring-cream-200/60 ${SWATCH_CLASSES[i % SWATCH_CLASSES.length]}`}>{p.emoji}</div>
              <div className="text-xs font-normal text-warm-black lowercase truncate">{p.name}</div>
              <div className="text-[11px] font-light text-warm-gray truncate">{p.price}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Creators like you — social follow strip */}
      <section className="pt-8 border-t border-cream-200 pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-warm-black">creators like you</span>
          <Link to="/friends" className="text-xs font-normal text-cream-500 hover:text-warm-black transition-colors">see all</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {allUsers.filter((u) => u.id !== profileUser.id).slice(0, 6).map((creator, i) => (
            <div key={creator.id} className="flex-shrink-0 w-[80px] text-center">
              <Link to={`/user/${creator.id}`} className="block hover:opacity-80 transition-opacity">
                <div className={`w-14 h-14 rounded-full mx-auto mb-1.5 flex items-center justify-center text-lg font-light ring-2 ring-cream-200 overflow-hidden ${SWATCH_CLASSES[(i + 2) % SWATCH_CLASSES.length]}`}>
                  {initials(creator)}
                </div>
                <div className="text-xs font-normal text-warm-black lowercase truncate">{creator.name}</div>
              </Link>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); follow(creator.id) }}
                className="mt-1 text-[11px] font-medium text-cream-500 hover:text-warm-black transition-colors"
              >
                follow
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
