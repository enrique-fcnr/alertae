import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Funcionalidades from '../components/Funcionalidades.jsx'
import Depoimentos from '../components/Depoimentos.jsx'
import Planos from '../components/Planos.jsx'
import Contato from '../components/Contato.jsx'
import Footer from '../components/footer.jsx'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Funcionalidades />
      <Depoimentos />
      <Planos />
      <Contato />
      <Footer />
    </>
  )
}

export default Home
