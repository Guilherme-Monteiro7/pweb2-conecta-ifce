import { useAuth } from "@/features/auth/contexts/AuthContext"
import UserMenu from "@/shared/components/user-menu"
import Navbar from "@/shared/navbar"
import { Navigate, Outlet } from "react-router"

function AppLayout(){

  const { isAuthenticated } = useAuth()

  if(!isAuthenticated){
    return <Navigate to='/login' replace />
  }

  return (
     <>
      <div className="flex flex-col min-h-svh">
         <Navbar>
          <Navbar.Brand to='/feed' />

          <Navbar.Links>
            <Navbar.Link to='/feed' text='Feed' />
            <Navbar.Link to='/groups' text='Grupos' />
          </Navbar.Links>

          <Navbar.Actions>
           <UserMenu />
          </Navbar.Actions>
        </Navbar>

        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AppLayout
