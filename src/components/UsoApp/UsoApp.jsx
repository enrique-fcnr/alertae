import React from 'react';
import './UsoApp.css';
import { BsCloudArrowDown, BsGear, BsPhone } from 'react-icons/bs';

const UsoApp = () => {
  return (
    <section className="uso-app-section">
      <div className="uso-app-content">
        <h2>como funciona o app</h2>
        <p>
        Em poucos passos, você transforma segurança e agilidade em parte da sua rotina.
        </p>

        <div className="uso-app-steps">

          <div className="step-item">
            <BsCloudArrowDown className="step-icon" />
            <h3>Baixe o aplicativo</h3>
            <p>
            Disponível para Android e iOS. Instale o Alertaê e comece a proteger o que realmente importa.
            </p>
          </div>

          <div className="arrow">{'>'}</div>

          <div className="step-item">
            <BsGear className="step-icon" />
            <h3>Crie seu perfil</h3>
            <p>
            Cadastre suas informações principais e personalize suas preferências de segurança.
            </p>
          </div>

          <div className="arrow">{'>'}</div>

          <div className="step-item">
            <BsPhone className="step-icon" />
            <h3>Ative os alertas</h3>
            <p>
            Receba notificações em tempo real sobre riscos, emergências e informações úteis da sua região.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UsoApp;
