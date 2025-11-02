import React from 'react';
import './Recompensas.css';
import { FaMedal, FaShieldAlt, FaBrain, FaStore, FaGift, FaHandsHelping } from 'react-icons/fa';

const Recompensas = () => {
  // Função dummy para o clique do botão - você pode substituí-la pela lógica real
  const handleResgatarClick = (recompensaNome) => {
    alert(`Você clicou em resgatar: ${recompensaNome}`);
    // Aqui você adicionaria a lógica para resgatar a recompensa
  };

  return (
    <main className="recompensas-wrapper">
      <section className="recompensas-container">
        <h1 className="recompensas-title">Recompensas do Edukaê</h1>
        <p className="recompensas-subtitle">Ganhe prêmios enquanto aprende a se proteger em situações de risco.</p>

        <div className="recompensas-grid">

          {/* Card: Medalha de Especialista em Inundações */}
          <div className="recompensa-card">
            <div className="recompensa-card-inner">
              <div className="recompensa-card-front">
                <FaMedal className="recompensa-icon ouro" />
              </div>
              <div className="recompensa-card-back">
                <h3>Medalha de Especialista em Inundações</h3>
                <p>Conquistada após dominar os quizzes sobre enchentes.</p>
                <button
                  className="resgatar-button"
                  onClick={() => handleResgatarClick('Medalha de Especialista em Inundações')}
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>

          {/* Card: Selo "Pronto para Emergências" */}
          <div className="recompensa-card">
            <div className="recompensa-card-inner">
              <div className="recompensa-card-front">
                <FaShieldAlt className="recompensa-icon prata" />
              </div>
              <div className="recompensa-card-back">
                <h3>Selo “Pronto para Emergências”</h3>
                <p>Recebido após completar todas as categorias do Edukaê.</p>
                <button
                  className="resgatar-button"
                  onClick={() => handleResgatarClick('Selo “Pronto para Emergências”')}
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>

          {/* Card: 100% no Quiz Avançado */}
          <div className="recompensa-card">
            <div className="recompensa-card-inner">
              <div className="recompensa-card-front">
                <FaBrain className="recompensa-icon azul" />
              </div>
              <div className="recompensa-card-back">
                <h3>100% no Quiz Avançado</h3>
                <p>Acertou tudo? Prove que você é um expert em segurança.</p>
                <button
                  className="resgatar-button"
                  onClick={() => handleResgatarClick('100% no Quiz Avançado')}
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>

          {/* Card: Descontos em Parceiros */}
          <div className="recompensa-card">
            <div className="recompensa-card-inner">
              <div className="recompensa-card-front">
                <FaStore className="recompensa-icon verde" />
              </div>
              <div className="recompensa-card-back">
                <h3>Descontos em Parceiros</h3>
                <p>Ganhe cupons em lojas de EPI, farmácias e mercados locais.</p>
                <button
                  className="resgatar-button"
                  onClick={() => handleResgatarClick('Descontos em Parceiros')}
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>

          {/* Card: Brindes e Kits */}
          <div className="recompensa-card">
            <div className="recompensa-card-inner">
              <div className="recompensa-card-front">
                <FaGift className="recompensa-icon roxo" />
              </div>
              <div className="recompensa-card-back">
                <h3>Brindes e Kits</h3>
                <p>Conquiste brindes físicos ao acumular pontos no app.</p>
                <button
                  className="resgatar-button"
                  onClick={() => handleResgatarClick('Brindes e Kits')}
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>

          {/* Card: Pontuação Solidária */}
          <div className="recompensa-card">
            <div className="recompensa-card-inner">
              <div className="recompensa-card-front">
                <FaHandsHelping className="recompensa-icon solidario" />
              </div>
              <div className="recompensa-card-back">
                <h3>Pontuação Solidária</h3>
                <p>Cada 1000 pontos = 1 kit de emergência doado por ONGs.</p>
                <button
                  className="resgatar-button"
                  onClick={() => handleResgatarClick('Pontuação Solidária')}
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Recompensas;