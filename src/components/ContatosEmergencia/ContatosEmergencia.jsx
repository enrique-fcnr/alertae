import React from 'react';
import './ContatosEmergencia.css';
import { FiPhoneCall } from 'react-icons/fi';
import { FaShieldAlt, FaFireExtinguisher, FaAmbulance } from 'react-icons/fa';

const ContatosEmergencia = () => {
  return (
    <main className="emergencia-container">
      <section className="emergencia-content">
        <h1 className="emergencia-title">Contatos de Emergência</h1>
        <p className="emergencia-subtitle">
          Em situações de risco, o tempo de resposta pode salvar vidas. Por isso, facilitamos o acesso aos principais serviços de emergência do país.
        </p>

        <div className="contatos-grid">
          <div className="contato-card policia">
            <FaShieldAlt className="contato-icone" />
            <h2>Polícia</h2>
            <p>Proteção e segurança em situações de emergência policial.</p>
            <a href="tel:190" className="contato-botao policia-botao">
              <FiPhoneCall /> Ligar 190
            </a>
          </div>

          <div className="contato-card bombeiros">
            <FaFireExtinguisher className="contato-icone" />
            <h2>Bombeiros</h2>
            <p>Combate a incêndios, resgates e emergências ambientais.</p>
            <a href="tel:193" className="contato-botao bombeiros-botao">
              <FiPhoneCall /> Ligar 193
            </a>
          </div>

          <div className="contato-card samu">
            <FaAmbulance className="contato-icone" />
            <h2>SAMU</h2>
            <p>Atendimento pré-hospitalar para situações médicas urgentes.</p>
            <a href="tel:192" className="contato-botao samu-botao">
              <FiPhoneCall /> Ligar 192
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContatosEmergencia;
