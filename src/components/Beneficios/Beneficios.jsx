import React from 'react';
import { FiBox, FiCheckCircle, FiGift, FiClock } from 'react-icons/fi';
import mockup6 from '../../assets/mockup6.png';
import './Beneficios.css';

const Beneficios = () => {
  return (
    <section className="beneficios-section">
      <div className="beneficios-container">

        <div className="beneficios-content">
          <h2>benefícios</h2>

          <ul className="beneficios-list">
            <li>
              <FiBox className="icon" />
              Tenha tudo o que você precisa em um só lugar: segurança, agilidade e informações em tempo real sempre disponíveis.
            </li>
            <li>
              <FiCheckCircle className="icon" />
              Receba alertas personalizados e acionamentos rápidos em situações de emergência com apenas um toque.
            </li>
            <li>
              <FiGift className="icon" />
              Desfrute de uma experiência simples, intuitiva e totalmente pensada para facilitar a sua rotina e garantir a sua segurança.
            </li>
            <li>
              <FiClock className="icon" />
              Ganhe tempo e tranquilidade com funcionalidades inteligentes que trabalham por você 24 horas por dia.
            </li>
          </ul>

          <button className="btn-gradiente">
            Saber Mais →
          </button>
        </div>

        <div className="beneficios-image">
          <img src={mockup6} alt="Mockup Benefícios" />
        </div>

      </div>
    </section>
  );
};

export default Beneficios;
