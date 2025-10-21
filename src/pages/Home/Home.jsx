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
import avatarChat from "../../assets/avatar-chat.png"
import Modal from "@/components/Modal/Modal.jsx"


// Importações do n8n Chat
import '@n8n/chat/style.css'; // Estilos obrigatórios
import { createChat } from '@n8n/chat';


function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Abre apenas na primeira renderização
        setIsModalOpen(true);
    }, []);

    useEffect(() => {
        // Definimos a função de inicialização do Chatbot.
        // Usamos o padrão de URL (WebHook) que você forneceu.
        const initChatbot = () => {

            // n8nChatUrl: Sua URL do Webhook do n8n Chat Trigger
            const n8nChatUrl = "https://n8n-n8n.8cn8wt.easypanel.host/webhook/ffcf29b6-19e9-40fd-81a6-132910560043/chat";

            if (window.Chatbot && typeof window.Chatbot.init === 'function') {
                window.Chatbot.init({
                    "n8nChatUrl": n8nChatUrl,
                    "metadata": {},
                    "theme": {
                        "button": {
                            "backgroundColor": "transparent",
                            "right": 20,
                            "bottom": 20,
                            "size": 100,
                            "iconColor": "transparent",

                            // Ícone customizado
                            "customIconSrc": avatarChat,
                            "customIconSize": 92,
                            "borderRadius": "circle"
                        },
                        "tooltip": {
                            "showTooltip": true,
                            "tooltipMessage": "E aí! 👋 Converse com a Central Alertaê!", /* Mensagem jovem */
                            "tooltipBackgroundColor": "#1a73e8", /* Cor do Alertaê */
                            "tooltipTextColor": "#ffffff",
                            "tooltipFontSize": 14
                        },
                        "chatWindow": {
                            "borderRadiusStyle": "rounded",
                            "showTitle": true,
                            "title": "Central Alertaê",
                            "titleAvatarSrc": avatarChat,
                            "welcomeMessage": "Olá! Sou o Agente Alertaê. Como posso te ajudar hoje?", /* Mensagem do Agente */
                            "backgroundColor": "#f9f9f9", /* Fundo limpo */
                            "height": 550,
                            "width": 350,
                            "botMessage": {
                                "backgroundColor": "#d1e7fd", /* Azul claro/suave */
                                "textColor": "#050505",
                                "showAvatar": false,
                            },
                            "userMessage": {
                                "backgroundColor": "#ffffff", /* Mensagem do usuário branca, destacada por sombra */
                                "textColor": "#050505",
                                "showAvatar": false,
                            },
                            "textInput": {
                                "placeholder": "Pergunte sobre clima...",
                                "backgroundColor": "#ffffff",
                                "textColor": "#1e1e1f",
                                "sendButtonColor": "#00c3ff", /* Azul Secundário para o botão de envio */
                                "borderRadius": 40,
                                "sendButtonBorderRadius": 50
                            }
                        }
                    }
                });
            }
        };

        // Este código injeta dinamicamente o script de embed.js.
        // Isso garante que a biblioteca seja carregada e o Chatbot.init seja chamado.
        const script = document.createElement('script');
        script.src = "https://cdn.n8nchatui.com/v1/embed.js";
        script.type = "module";
        script.defer = true;
        script.onload = initChatbot; // Chama initChatbot após o script ser carregado
        document.body.appendChild(script);

        return () => {
            // Limpeza: remove o script ao desmontar o componente
            document.body.removeChild(script);
            // Nota: O widget geralmente persiste após remoção do script, pode ser necessário 
            // um método de 'destroy' se o widget suportar.
        };

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