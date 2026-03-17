import Navbar from "./components/shared/navbar"
import Footer from "./components/shared/footer"

function App() {
  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1">Conteúdo Principal</main>
        <Footer/>
      </div>
    </>
  )
}

export default App
