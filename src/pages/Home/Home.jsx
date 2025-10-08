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

import ChatWidget from '../../components/ChatWidget/ChatWidget'; 
import { BiMessageDots } from 'react-icons/bi';





function Home() {
  
  // Estado para o Chat Widget
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };


  return (
    <>
      
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

         {/* O Chat Widget (aparece ou desaparece com base no estado) */}
      <ChatWidget isOpen={isChatOpen} onClose={toggleChat} />

      {/* O Botão Flutuante (sempre visível) */}
      <div 
        className={`floating-chat-button ${isChatOpen ? 'is-open' : ''}`} 
        onClick={toggleChat}
      >
        <BiMessageDots size={30} color="white" />
      </div>

    </>
  );
}

export default Home;


