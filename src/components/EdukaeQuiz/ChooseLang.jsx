// src/components/EdukaeQuiz/ChooseLang.jsx

import React, { useContext } from "react";
import "./ChooseLang.css";
import { QuizContext } from "../../context/quiz";

const ChooseLang = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="choose-lang">
      <h2>Escolha a categoria</h2>
      <p>Você pode aprender mais sobre como agir em diferentes situações de risco.</p>

      <div className="btn-lang-container">
        <button onClick={() => dispatch({ type: "CHANGE_STATE_HTML" })}>
          Inundações
        </button>
        <button onClick={() => dispatch({ type: "CHANGE_STATE_CSS" })}>
          Calor Extremo
        </button>
        <button onClick={() => dispatch({ type: "CHANGE_STATE_JAVASCRIPT" })}>
          Deslizamentos
        </button>
      </div>
    </div>
  );
};

export default ChooseLang;
