// src/components/EdukaeQuiz/GameOver.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import "./GameOver.css";
import { FaRedo, FaArrowRight, FaHome } from 'react-icons/fa'; // Icons for buttons

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Acessa as questões da categoria atual para saber o total
  const totalQuestions = quizState.questions && quizState.questions.questions
                          ? quizState.questions.questions.length
                          : 0; // Fallback para 0 se não encontrar


  return (
    <div className="gameover-container">
      <h2 className="gameover-title">Fim do Quiz 🎉</h2>
      <p className="gameover-score">
        Pontuação final: <strong>{quizState.score}</strong> de {totalQuestions}
      </p>

      <div className="gameover-buttons">
        <button className="gameover-button" onClick={() => dispatch({ type: "NEW_GAME" })}>
          <FaHome /> Voltar ao Início
        </button>

        {/* Botão Tentar Novamente (Reinicia a categoria atual) */}
         {/* Adapte o tipo de dispatch se necessário para reiniciar a categoria atual */}
         {/* Se NEW_GAME sempre volta para a seleção, talvez precise de uma ação RESTART_CATEGORY */}
        {/* <button className="gameover-button" onClick={() => dispatch({ type: "NEW_GAME" })}>
          <FaRedo /> Tentar Novamente
        </button> */}


        {/* Lógica para Próximo Quiz ou Reiniciar */}
        {quizState.changeCategory === 0 && totalQuestions > 0 && (
          <button className="gameover-button next-quiz" onClick={() => dispatch({ type: "CHANGE_STATE_CSS" })}>
            Próximo Quiz (Calor Extremo) <FaArrowRight />
          </button>
        )}

        {quizState.changeCategory === 1 && totalQuestions > 0 && (
          <button className="gameover-button next-quiz" onClick={() => dispatch({ type: "CHANGE_STATE_JAVASCRIPT" })}>
            Próximo Quiz (Deslizamentos) <FaArrowRight />
          </button>
        )}

        {/* Se for a última categoria, ou se não houver lógica de próximo, mostra Reiniciar Tudo */}
        {/* Adicionei a condição totalQuestions > 0 para segurança */}
        {quizState.changeCategory === 2 && totalQuestions > 0 && (
           <p className="gameover-final-message">Você completou todas as categorias!</p>
          // O botão Voltar ao Início já serve como Reiniciar Tudo
        )}
      </div>
    </div>
  );
};

export default GameOver;