import Navbar from "../../components/Navbar/Navbar.jsx"
import Hero from "../../components/Hero/Hero.jsx"
import Funcionalidades from "../../components/Funcionalidades/Funcionalidades.jsx"
import InterfaceApp from "../../components/InterfaceApp/InterfaceApp.jsx"
import Planos from "../../components/Planos/Planos.jsx"
import DownloadApp from "../../components/DownloadApp/DownloadApp.jsx"
import Depoimentos from "../../components/Depoimentos/Depoimentos.jsx"
import Contato from "../../components/Contato/Contato.jsx"
import Footer from "../../components/Footer/Footer.jsx"

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Funcionalidades />
      <InterfaceApp />
      <Planos />
      <DownloadApp />
      <Depoimentos />
      <Contato />
      <Footer />
    </>
  )
}

export default Home


