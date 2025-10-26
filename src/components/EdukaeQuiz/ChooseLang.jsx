// src/components/EdukaeQuiz/ChooseLang.jsx

import React, { useContext } from "react";
import "./ChooseLang.css";
import { QuizContext } from "../../context/quiz";
import { FaWater, FaTemperatureHigh, FaMountain } from 'react-icons/fa'; // Icons for categories

const ChooseLang = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="choose-lang">
      <h2 className="choose-lang-title">Escolha a Categoria</h2>
      <p className="choose-lang-subtitle">Aprenda a agir em diferentes situações de risco.</p>

      <div className="btn-lang-container">
        <button className="category-button" onClick={() => dispatch({ type: "CHANGE_STATE_HTML" })}>
          <FaWater className="category-icon" />
          <span>Inundações</span>
        </button>
        <button className="category-button" onClick={() => dispatch({ type: "CHANGE_STATE_CSS" })}>
          <FaTemperatureHigh className="category-icon" />
          <span>Calor Extremo</span>
        </button>
        <button className="category-button" onClick={() => dispatch({ type: "CHANGE_STATE_JAVASCRIPT" })}>
          <FaMountain className="category-icon" />
          <span>Deslizamentos</span>
        </button>
      </div>
    </div>
  );
};

export default ChooseLang;

