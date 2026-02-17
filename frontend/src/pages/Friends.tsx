import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFriends } from '../context/FriendsContext'
import type { FriendUser } from '../context/FriendsContext'

function UserRow({
  user,
  status,
  onFollow,
  onUnfollow,
}: {
  user: FriendUser
  status: 'friend' | 'following' | 'none'
  onFollow: () => void
  onUnfollow: () => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-cream-200 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-warm-gray text-sm font-medium">
          {user.name.slice(0, 2).toLowerCase()}
        </div>
        <div>
          <Link
            to={`/user/${user.id}`}
            className="font-medium text-warm-black lowercase hover:text-cream-500 transition-colors"
          >
            {user.name}
          </Link>
          <p className="text-sm text-warm-gray">@{user.username}</p>
        </div>
      </div>
      <div>
        {status === 'friend' && (
          <span className="text-sm text-warm-gray lowercase">friend</span>
        )}
        {status === 'following' && (
          <button
            type="button"
            onClick={onUnfollow}
            className="text-sm text-cream-500 lowercase hover:opacity-80 transition-opacity"
          >
            following
          </button>
        )}
        {status === 'none' && (
          <button
            type="button"
            onClick={onFollow}
            className="text-sm text-cream-500 lowercase hover:opacity-80 transition-opacity"
          >
            follow
          </button>
        )}
      </div>
    </div>
  )
}

export function Friends() {
  const {
    friends,
    followingList,
    followersList,
    recommended,
    searchUsers,
    follow,
    unfollow,
    isFollowing,
    isFriend,
  } = useFriends()

  const [searchQuery, setSearchQuery] = useState('')
  const searchResults = useMemo(
    () => (searchQuery.trim() ? searchUsers(searchQuery) : []),
    [searchQuery, searchUsers]
  )

  const getStatus = (user: FriendUser): 'friend' | 'following' | 'none' => {
    if (isFriend(user.id)) return 'friend'
    if (isFollowing(user.id)) return 'following'
    return 'none'
  }

  return (
    <div>
      <h1 className="text-4xl font-light lowercase text-warm-black mb-6">friends</h1>

      {/* Search */}
      <div className="mb-8">
        <label htmlFor="friend-search" className="sr-only">
          search friends
        </label>
        <input
          id="friend-search"
          type="search"
          placeholder="search by name or username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md bg-cream-100 border border-cream-200 rounded-sm px-4 py-2.5 text-sm lowercase text-warm-black placeholder:text-warm-gray focus:outline-none focus:border-cream-500 transition-colors"
        />
      </div>

      {/* Search results */}
      {searchQuery.trim() && (
        <section className="mb-10">
          <h2 className="text-xl font-light lowercase text-warm-black mb-3">search</h2>
          {searchResults.length === 0 ? (
            <p className="text-warm-gray text-sm">no one found</p>
          ) : (
            <div className="bg-cream-50 border border-cream-200 rounded p-4">
              {searchResults.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  status={getStatus(user)}
                  onFollow={() => follow(user.id)}
                  onUnfollow={() => unfollow(user.id)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Friends (mutual) */}
      <section className="mb-10">
        <h2 className="text-xl font-light lowercase text-warm-black mb-3">friends</h2>
        <div className="bg-cream-50 border-2 border-cream-300 rounded-lg p-4 ring-1 ring-cream-200/50 shadow-sm min-h-[120px]">
          {friends.length === 0 ? (
            <p className="text-warm-gray text-sm">when someone you follow follows you back, they’ll show here</p>
          ) : (
            <>
              {friends.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  status="friend"
                  onFollow={() => follow(user.id)}
                  onUnfollow={() => unfollow(user.id)}
                />
              ))}
            </>
          )}
        </div>
      </section>

      {/* Following */}
      <section className="mb-10">
        <h2 className="text-xl font-light lowercase text-warm-black mb-3">following</h2>
        <div className="bg-cream-50 border-2 border-cream-300 rounded-lg p-4 ring-1 ring-cream-200/50 shadow-sm min-h-[120px]">
          {followingList.length === 0 ? (
            <p className="text-warm-gray text-sm">people you follow will show here</p>
          ) : (
            <>
              {followingList.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                status={isFriend(user.id) ? 'friend' : 'following'}
                onFollow={() => follow(user.id)}
                onUnfollow={() => unfollow(user.id)}
              />
            ))}
            </>
          )}
        </div>
      </section>

      {/* Followers */}
      <section className="mb-10">
        <h2 className="text-xl font-light lowercase text-warm-black mb-3">followers</h2>
        {followersList.length === 0 ? (
          <p className="text-warm-gray text-sm">when someone follows you, they’ll show here</p>
        ) : (
          <div className="bg-cream-50 border border-cream-200 rounded p-4">
            {followersList.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                status={getStatus(user)}
                onFollow={() => follow(user.id)}
                onUnfollow={() => unfollow(user.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recommended */}
      <section>
        <h2 className="text-xl font-light lowercase text-warm-black mb-3">recommended</h2>
        {recommended.length === 0 ? (
          <p className="text-warm-gray text-sm">you’re following everyone for now</p>
        ) : (
          <div className="bg-cream-50 border border-cream-200 rounded p-4">
            {recommended.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                status="none"
                onFollow={() => follow(user.id)}
                onUnfollow={() => unfollow(user.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
