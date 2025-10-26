import React from 'react';
import './HomeQuiz.css';
import { FaBrain, FaStar, FaGift, FaShieldAlt, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeQuiz = () => {
  return (
    <section className="home-quiz-section">
      <div className="home-quiz-container">
        <div className="home-quiz-content">
          {/* Coluna Esquerda: Texto */}
          <div className="home-quiz-text">
            <h2 className="home-quiz-title">Edukaê: Aprenda e Ganhe Pontos</h2>
            <p className="home-quiz-description">
              Descubra o Edukaê, a gamificação do Alertaê! Jogue quizzes divertidos,
              aprenda sobre segurança e prevenção em desastres climáticos, acumule
              pontos e troque por recompensas incríveis. Sua segurança nunca foi
              tão recompensadora!
            </p>
            <Link to="/edukae/quiz" className="home-quiz-button-link">
              <button className="home-quiz-button">
                <FaPlay className="button-icon" /> Jogar Agora
              </button>
            </Link>
          </div>

          {/* Coluna Direita: Visual */}
          <div className="home-quiz-visual">
            <div className="visual-icon icon-brain">
              <FaBrain />
            </div>
            <div className="visual-icon icon-star1">
              <FaStar />
            </div>
             <div className="visual-icon icon-star2">
              <FaStar />
            </div>
            <div className="visual-icon icon-gift">
              <FaGift />
            </div>
            <div className="visual-icon icon-shield">
              <FaShieldAlt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeQuiz;
