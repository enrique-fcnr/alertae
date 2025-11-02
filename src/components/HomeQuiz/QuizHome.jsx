import React from "react";
import "./HomeQuiz.css";
import { FaBrain, FaStar, FaGift, FaShieldAlt, FaPlay, FaPuzzlePiece } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeQuiz = () => {
  return (
    <section className="home-quiz-section" aria-labelledby="home-quiz-title">
      <div className="home-quiz-container">
        <div className="home-quiz-content">
          {/* Coluna Esquerda: Texto */}
          <div className="home-quiz-text">
            <h2 id="home-quiz-title" className="home-quiz-title">
              Edukaê: <span className="home-quiz-title-2">Aprenda e Ganhe Pontos</span>
            </h2>
            <p className="home-quiz-description">
              Descubra o Edukaê, a gamificação do Alertaê. Responda quizzes rápidos,
              aprenda sobre prevenção e segurança em desastres climáticos, acumule
              pontos e troque por recompensas. Segurança com recompensa real.
            </p>
            <Link to="/edukae/quiz" className="home-quiz-button-link" aria-label="Jogar Edukaê">
              <button className="home-quiz-button">
                <FaPlay className="button-icon" aria-hidden="true" />
                Jogar Agora
              </button>
            </Link>
          </div>

          {/* Coluna Direita: Visual */}
          <div className="home-quiz-visual" aria-hidden="true">
            <div className="visual-icon icon-brain"><FaBrain /></div>
            <div className="visual-icon icon-star1"><FaStar /></div>
            <div className="visual-icon icon-star2"><FaStar /></div>
            <div className="visual-icon icon-gift"><FaGift /></div>
            <div className="visual-icon icon-shield"><FaShieldAlt /></div>
            <div className="visual-icon icon-puzzle"><FaPuzzlePiece /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeQuiz;
