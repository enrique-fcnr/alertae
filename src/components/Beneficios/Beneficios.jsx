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
              Receba alertas sobre enchentes, calor e riscos com precisão, antes que a situação se agrave.
            </li>
            <li>
              <FiCheckCircle className="icon" />
               Acesse rotas seguras, pontos de apoio e contatos de emergência com um só toque.
            </li>
            <li>
              <FiClock className="icon" />
              Ensine sua família a se proteger com quizzes interativos e educativos do Edukaê.
            </li>
            <li>
              <FiGift className="icon" />
              Ganhe recompensas por participação e ajude causas sociais com sua pontuação.
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
