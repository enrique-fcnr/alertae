import React from 'react';
import './Recompensas.css';
import { FaMedal, FaShieldAlt, FaFireAlt, FaBrain, FaStore, FaGift, FaHandsHelping } from 'react-icons/fa';

const Recompensas = () => {
  return (
    <main className="recompensas-wrapper">
      <section className="recompensas-container">
        <h1 className="recompensas-title">🎁 Recompensas do Edukaê</h1>
        <p className="recompensas-subtitle">Ganhe prêmios enquanto aprende a se proteger em situações de risco.</p>

        <div className="recompensas-grid">

          <div className="recompensa-card destaque">
            <FaMedal className="recompensa-icon ouro" />
            <h3>Medalha de Especialista em Inundações</h3>
            <p>Conquistada após dominar os quizzes sobre enchentes.</p>
          </div>

          <div className="recompensa-card destaque">
            <FaShieldAlt className="recompensa-icon prata" />
            <h3>Selo “Pronto para Emergências”</h3>
            <p>Recebido após completar todas as categorias do Edukaê.</p>
          </div>

          <div className="recompensa-card destaque">
            <FaFireAlt className="recompensa-icon bronze" />
            <h3>Medalha “Herói do Clima”</h3>
            <p>Alcance pontuação máxima em 3 categorias.</p>
          </div>

          <div className="recompensa-card destaque">
            <FaBrain className="recompensa-icon azul" />
            <h3>100% no Quiz Avançado</h3>
            <p>Acertou tudo? Prove que você é um expert em segurança.</p>
          </div>

          <div className="recompensa-card destaque">
            <FaStore className="recompensa-icon verde" />
            <h3>Descontos em Parceiros</h3>
            <p>Ganhe cupons em lojas de EPI, farmácias e mercados locais.</p>
          </div>

          <div className="recompensa-card destaque">
            <FaGift className="recompensa-icon roxo" />
            <h3>Brindes e Kits</h3>
            <p>Conquiste brindes físicos ao acumular pontos no app.</p>
          </div>

          <div className="recompensa-card destaque">
            <FaHandsHelping className="recompensa-icon solidario" />
            <h3>Pontuação Solidária</h3>
            <p>Cada 1000 pontos = 1 kit de emergência doado por ONGs.</p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Recompensas;
