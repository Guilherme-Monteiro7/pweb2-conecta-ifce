import { useAuth } from '@/features/auth/contexts/AuthContext'
import Footer from '@/shared/footer'
import useScroll from '@/shared/hooks/useScroll'
import Navbar from '@/shared/navbar'
import { Navigate } from 'react-router'
import { Outlet } from 'react-router'

function PublicLayout() {
  const { isAthenticated } = useAuth()

  if (isAthenticated) {
    return <Navigate to="/feed" replace />
  }

  useScroll()
  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default PublicLayout
