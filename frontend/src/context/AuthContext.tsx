import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type User = {
  id: string
  email: string
  name?: string
}

type AuthContextValue = {
  user: User | null
  isGuest: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  continueAsGuest: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)

  const login = useCallback(async (emailOrUsername: string, password: string) => {
    // Hardcoded admin login for development
    if (emailOrUsername === 'admin' && password === 'adminpassword') {
      setUser({ id: 'admin', email: 'admin@shopcircle.local', name: 'admin' })
      setIsGuest(false)
      return
    }
    // TODO: call backend POST /auth/login for normal users
    setUser({ id: '1', email: emailOrUsername, name: emailOrUsername.split('@')[0] })
    setIsGuest(false)
  }, [])

  const signup = useCallback(async (email: string, _password: string, name?: string) => {
    // TODO: call backend POST /auth/signup
    setUser({ id: '1', email, name: name ?? email.split('@')[0] })
    setIsGuest(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsGuest(false)
  }, [])

  const continueAsGuest = useCallback(() => {
    setUser(null)
    setIsGuest(true)
  }, [])

  const value: AuthContextValue = {
    user,
    isGuest,
    login,
    signup,
    logout,
    continueAsGuest,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
