// src/components/EdukaeQuiz/Welcome.jsx
import React, { useContext } from "react";
import "./Welcome.css";
import { QuizContext } from "../../context/quiz";
import { BsCloudLightningRainFill } from "react-icons/bs"; // Ícone de tempestade/quiz

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="welcome-container">
      <div className="welcome-icon">
        <BsCloudLightningRainFill />
      </div>

      <h1>Bem-vindo ao Edukaê Quiz!</h1>
      <p>Teste seus conhecimentos sobre prevenção e segurança em situações de risco.</p>
      <button onClick={() => dispatch({ type: "CHOOSE_LANG" })}>
        Começar Quiz
      </button>
    </div>
  );
};

export default Welcome;
