import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { MyProducts } from './pages/MyProducts'
import { Lists } from './pages/Lists'
import { ListDetail } from './pages/ListDetail'
import { Friends } from './pages/Friends'
import { Profile } from './pages/Profile'
import { UserProfile } from './pages/UserProfile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isGuest } = useAuth()
  if (!user && !isGuest) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <MyProducts />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <Layout>
                <Lists />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lists/:listId"
          element={
            <ProtectedRoute>
              <Layout>
                <ListDetail />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Layout>
                <Friends />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <ProtectedRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-24">{children}</main>
    </div>
  )
}
