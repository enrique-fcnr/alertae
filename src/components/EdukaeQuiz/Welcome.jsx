import React, { useContext } from "react";
import "./Welcome.css";
import { QuizContext } from "../../context/quiz"; // Voltando para o caminho relativo
import { FaGraduationCap } from "react-icons/fa"; // Ícone de formatura

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="welcome-container">
      <div className="welcome-icon-wrapper">
        <FaGraduationCap className="welcome-icon"/>
      </div>

      <h1 className="welcome-title">Bem-vindo ao Edukaê Quiz!</h1>
      <p className="welcome-subtitle">Teste seus conhecimentos sobre prevenção e segurança em situações de risco.</p>
      <button className="welcome-button" onClick={() => dispatch({ type: "CHOOSE_LANG" })}>
        Começar Quiz
      </button>
    </div>
  );
};

export default Welcome;
