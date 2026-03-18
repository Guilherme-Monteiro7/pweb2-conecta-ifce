import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import HomePage from '@/pages/HomePage'

function App() {
  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1">
          <HomePage />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
