// src/components/EdukaeQuiz/GameOver.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import "./GameOver.css";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="gameover-container">
      <h2>Fim do Quiz 🎉</h2>
      <p>Pontuação final: <strong>{quizState.score}</strong></p>

      <div className="gameover-buttons">
        <button onClick={() => dispatch({ type: "NEW_GAME" })}>
          Tentar Novamente
        </button>

        {quizState.changeCategory === 0 && (
          <button onClick={() => dispatch({ type: "CHANGE_STATE_CSS" })}>
            Próximo Quiz (Cuidados em Tempestades)
          </button>
        )}

        {quizState.changeCategory === 1 && (
          <button onClick={() => dispatch({ type: "CHANGE_STATE_JAVASCRIPT" })}>
            Próximo Quiz (Primeiros Socorros)
          </button>
        )}

        {quizState.changeCategory === 2 && (
          <button onClick={() => dispatch({ type: "NEW_GAME" })}>
            Reiniciar Tudo
          </button>
        )}
      </div>
    </div>
  );
};

export default GameOver;
