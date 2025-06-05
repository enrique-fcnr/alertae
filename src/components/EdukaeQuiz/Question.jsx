// src/components/EdukaeQuiz/Question.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import "./Question.css";
import Options from "./Options";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions.questions[quizState.currentQuestion];

  return (
    <div className="question-container">
      <h2>{currentQuestion.question}</h2>
      <Options options={currentQuestion.options} answer={currentQuestion.answer} />
      {quizState.showTip && <p className="tip">{currentQuestion.tip}</p>}
      {quizState.answerSelected && (
        <button className="next-btn" onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
          Próxima
        </button>
      )}
    </div>
  );
};

export default Question;
