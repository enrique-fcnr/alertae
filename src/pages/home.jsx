import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Funcionalidades from '../components/Funcionalidades'
import Depoimentos from '../components/Depoimentos'
import Contato from '../components/Contato'
import Footer from '../components/footer.jsx'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Funcionalidades />
      <Depoimentos />
      <Contato />
      <Footer />
    </>
  )
}

export default Home
