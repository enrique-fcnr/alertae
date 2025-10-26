// src/components/EdukaeQuiz/Question.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import "./Question.css";
import Options from "./Options";
import { FaLightbulb } from 'react-icons/fa'; // Import tip icon

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestionData = quizState.questions.questions[quizState.currentQuestion];

  // Adiciona verificação para caso currentQuestionData seja undefined
  if (!currentQuestionData) {
    // Pode retornar null, um loader, ou uma mensagem de erro/fim
    console.error("Dados da questão atual não encontrados!");
    // Opcional: Redirecionar para o estado inicial ou final
    // dispatch({ type: "NEW_GAME" });
    return <div className="loading-question">Carregando questão...</div>;
  }


  return (
    <div className="question-container">
      <p className="question-counter">Questão {quizState.currentQuestion + 1} de {quizState.questions.questions.length}</p>
      <h2 className="question-text">{currentQuestionData.question}</h2>
      <Options options={currentQuestionData.options} answer={currentQuestionData.answer} />

      {/* Botão/Seção da Dica */}
      {!quizState.answerSelected && !quizState.showTip && (
        <button className="tip-button" onClick={() => dispatch({ type: "MOSTRAR_DICA" })}>
          <FaLightbulb /> Ver Dica
        </button>
      )}
      {quizState.showTip && <p className="tip-text"><FaLightbulb /> {currentQuestionData.tip}</p>}

      {/* Botão Próxima */}
      {quizState.answerSelected && (
        <button className="next-btn" onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
          Próxima &rarr;
        </button>
      )}
    </div>
  );
};

export default Question;
