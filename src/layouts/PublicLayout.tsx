import { useAuth } from '@/features/auth/contexts/AuthContext'
import { Button } from '@/shared/components/ui/button'
import Footer from '@/shared/footer'
import useScroll from '@/shared/hooks/useScroll'
import Navbar from '@/shared/navbar'
import { Link, Navigate } from 'react-router'
import { Outlet } from 'react-router'

function PublicLayout() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/feed" replace />
  }

  useScroll()
  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar>
          <Navbar.Brand to="/" />

          <Navbar.Links>
            <Navbar.Link to="/" text="Inicio" />
            <Navbar.Link to="/#feature-section" text="Recursos" />
            <Navbar.Link to="/#faq-section" text="Perguntas Frequentes" />
          </Navbar.Links>

          <Navbar.Actions>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="lg" asChild>
              <Link to="/register">Criar Conta</Link>
            </Button>
          </Navbar.Actions>
        </Navbar>

        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default PublicLayout
