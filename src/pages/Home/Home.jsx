import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Hero from "../../components/Hero/Hero.jsx"
import Funcionalidades from "../../components/Funcionalidades/Funcionalidades.jsx"
import InterfaceApp from "../../components/InterfaceApp/InterfaceApp.jsx"
import Beneficios from "../../components/Beneficios/Beneficios.jsx"
import Planos from "../../components/Planos/Planos.jsx"
import DownloadApp from "../../components/DownloadApp/DownloadApp.jsx"
import Depoimentos from "../../components/Depoimentos/Depoimentos.jsx"
import Contato from "../../components/Contato/Contato.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Modal from '../../components/Modal/Modal.jsx'





function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Abre apenas na primeira renderização
    setIsModalOpen(true);
  }, []);

  return (
    <>


      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="São Paulo - Hoje"
      >
      </Modal>
      <Navbar />
      <Hero />
      <Funcionalidades />
      <Beneficios />
      <InterfaceApp />
      <Planos />
      <DownloadApp />
      <Depoimentos />
      <Contato />
      <Footer />
    </>
  );
}

export default Home;


