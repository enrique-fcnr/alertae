// src/components/EdukaeQuiz/Options.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz.jsx";
import "./Options.css";

const Options = ({ options, answer }) => {
  const [quizState, dispatch] = useContext(QuizContext);

  const handleClick = (option) => {
    // Só dispara a ação se nenhuma resposta ainda foi selecionada
    if (!quizState.answerSelected) {
      dispatch({
        type: "CHECK_ANSWER",
        payload: { answer, option }
      });
    }
  };

  return (
    <div className="options-container">
      {options.map((option, index) => {
        // Lógica de classes otimizada
        const isSelected = quizState.answerSelected === option;
        const isCorrect = option === answer;
        const showResult = quizState.answerSelected;

        // Define a classe do botão
        const buttonClass = `
          option-btn 
          ${showResult && isCorrect ? 'correct' : ''} 
          ${showResult && isSelected && !isCorrect ? 'wrong' : ''}
          ${showResult && !isSelected && !isCorrect ? 'disabled' : ''}
        `;

        return (
          <button
            // Usamos .trim() para remover espaços em branco extras da string da classe
            className={buttonClass.trim().replace(/\s+/g, ' ')}
            onClick={() => handleClick(option)}
            key={index}
            // Desabilita todos os botões após uma resposta ser selecionada
            disabled={!!quizState.answerSelected} 
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
