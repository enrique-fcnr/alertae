import React from 'react';
import { FiBox, FiCheckCircle, FiGift, FiClock } from 'react-icons/fi';
import mockup6 from '../../assets/mockup6.png';
import './Beneficios.css';
import { Link } from 'react-router-dom';

const Beneficios = () => {
  return (
    <section className="beneficios-section">
      <div className="beneficios-container">

        <div className="beneficios-image">
          <img src={mockup6} alt="Mockup Benefícios" />
        </div>

        <div className="beneficios-content">
          <h2>Sua família
            <br /> merece estar segura!</h2>
          <div className="line-gradient"></div>
          <ul className="beneficios-list">
            <li>
              <FiBox className="icon" />
              Receba alertas sobre chuvas e calor extremo para proteger sua família com antecedência.
            </li>
            <li>
              <FiCheckCircle className="icon" />
               Interface simples com toque único para emergências, ideal para a terceira idade.
            </li>
            <li>
              <FiGift className="icon" />
              Tecnologia acessível com ícones grandes e leitura fácil para quem você ama.
            </li>
            <li>
              <FiClock className="icon" />
              Aplicativo intuitivo que funciona 24h para garantir segurança na rotina diária.
            </li>
          </ul>

           <Link to="/sobre/quem-somos">
          <button className="btn-gradiente">
            Saber Mais →
          </button>
        </Link>
        </div>

        

      </div>
    </section>
  );
};

export default Beneficios;
