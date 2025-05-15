import React from 'react';
import { FiCheckCircle, FiMessageCircle, FiLock, FiMapPin, FiSettings, FiGlobe } from 'react-icons/fi';
import "./Funcionalidades.css";

const Funcionalidades = () => {
  return (
    <section className="funcionalidades-section">
      <div className="funcionalidades-container">
        <h2>Funcionalidades</h2>
        <div className="line-gradientt"></div>
        <p>Descubra tudo o que o Alertaê pode fazer para te manter protegido e informado onde quer que você esteja.</p>

        <div className="funcionalidades-grid">
          <div className="funcionalidade-item"><FiCheckCircle className="icon" /><h3>Alertas em tempo real</h3><p>Receba notificações instantâneas sobre emergências e riscos na sua região.</p></div>

          <div className="funcionalidade-item"><FiMessageCircle className="icon" /><h3>Canal direto de ajuda</h3><p>Acione rapidamente serviços de emergência ou envie mensagens em situações críticas.</p></div>

          <div className="funcionalidade-item"><FiLock className="icon" /><h3>Proteção dos seus dados</h3><p>Suas informações ficam seguras com tecnologia de criptografia e privacidade garantida.</p></div>

          <div className="funcionalidade-item"><FiMapPin className="icon" /><h3>Localização inteligente</h3><p>Visualize pontos de perigo, áreas seguras e acompanhe alertas geolocalizados.</p></div>

          <div className="funcionalidade-item"><FiSettings className="icon" /><h3>Configurações personalizadas</h3><p>Controle como quer ser avisado e personalize os tipos de alerta que deseja receber.</p></div>

          <div className="funcionalidade-item"><FiGlobe className="icon" /><h3>Multiplataforma</h3><p>Use o Alertaê no celular ou no computador e mantenha-se protegido em qualquer lugar.</p></div>
        </div>
      </div>
    </section>
  );
};

export default Funcionalidades;


  