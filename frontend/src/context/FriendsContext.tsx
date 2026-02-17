import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'

export type FriendUser = {
  id: string
  name: string
  username: string
}

type FriendsContextValue = {
  /** All users (mock); exclude current user */
  allUsers: FriendUser[]
  /** User ids the current user follows */
  following: string[]
  /** User ids that follow the current user (mock) */
  followers: string[]
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  isFollowing: (userId: string) => boolean
  isFriend: (userId: string) => boolean
  /** People you follow who also follow you */
  friends: FriendUser[]
  /** People you follow (not yet mutual) */
  followingList: FriendUser[]
  /** People who follow you (you may or may not follow back) */
  followersList: FriendUser[]
  /** Recommended: not followed yet, sorted by "mutual" count (mock: random for now) */
  recommended: FriendUser[]
  searchUsers: (query: string) => FriendUser[]
}

const MOCK_USERS: FriendUser[] = [
  { id: '2', name: 'Jordan Lee', username: 'jordan' },
  { id: '3', name: 'Sam Rivera', username: 'sam' },
  { id: '4', name: 'Alex Chen', username: 'alex' },
  { id: '5', name: 'Riley Morgan', username: 'riley' },
  { id: '6', name: 'Casey Blake', username: 'casey' },
  { id: '7', name: 'Jamie Park', username: 'jamie' },
  { id: '8', name: 'Quinn Taylor', username: 'quinn' },
  { id: '9', name: 'Morgan Reed', username: 'morgan' },
]

const FriendsContext = createContext<FriendsContextValue | null>(null)

const CURRENT_USER_ID = '1'

/** Mock: a few users "follow" the current user so mutual works */
const MOCK_FOLLOWERS_OF_ME = ['2', '3', '4']

export function FriendsProvider({ children }: { children: ReactNode }) {
  const [following, setFollowing] = useState<string[]>([])

  const follow = useCallback((userId: string) => {
    setFollowing((prev) => (prev.includes(userId) ? prev : [...prev, userId]))
  }, [])

  const unfollow = useCallback((userId: string) => {
    setFollowing((prev) => prev.filter((id) => id !== userId))
  }, [])

  const followers = MOCK_FOLLOWERS_OF_ME
  const isFollowing = useCallback((userId: string) => following.includes(userId), [following])
  const isFriend = useCallback(
    (userId: string) => following.includes(userId) && followers.includes(userId),
    [following, followers]
  )

  const userMap = useMemo(() => Object.fromEntries(MOCK_USERS.map((u) => [u.id, u])), [])

  const friends = useMemo(
    () => following.filter((id) => followers.includes(id)).map((id) => userMap[id]).filter(Boolean),
    [following, followers, userMap]
  )

  const followingList = useMemo(
    () => following.map((id) => userMap[id]).filter(Boolean),
    [following, userMap]
  )

  const followersList = useMemo(
    () => followers.map((id) => userMap[id]).filter(Boolean),
    [followers, userMap]
  )

  const recommended = useMemo(() => {
    const followed = new Set(following)
    return MOCK_USERS.filter((u) => u.id !== CURRENT_USER_ID && !followed.has(u.id))
  }, [following])

  const searchUsers = useCallback(
    (query: string) => {
      const q = query.trim().toLowerCase()
      if (!q) return []
      return MOCK_USERS.filter(
        (u) =>
          u.id !== CURRENT_USER_ID &&
          (u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q))
      )
    },
    []
  )

  const allUsers = useMemo(
    () => MOCK_USERS.filter((u) => u.id !== CURRENT_USER_ID),
    []
  )

  const value: FriendsContextValue = {
    allUsers,
    following,
    followers,
    follow,
    unfollow,
    isFollowing,
    isFriend,
    friends,
    followingList,
    followersList,
    recommended,
    searchUsers,
  }

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
}

export function useFriends() {
  const ctx = useContext(FriendsContext)
  if (!ctx) throw new Error('useFriends must be used within FriendsProvider')
  return ctx
}
