import Footer from "@/shared/footer"
import useScroll from "@/shared/hooks/useScroll"
import Navbar from "@/shared/navbar"
import { Outlet } from "react-router"

function PublicLayout(){

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
