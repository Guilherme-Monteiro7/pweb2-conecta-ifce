import { useAuth } from "@/features/auth/contexts/AuthContext"
import Navbar from "@/shared/navbar"
import { Navigate, Outlet } from "react-router"

function AppLayout(){

  const {isAthenticated} = useAuth()

  if(!isAthenticated){
    return <Navigate to ='/login' replace />
  }
  return (
     <>
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  )

}

export default AppLayout
