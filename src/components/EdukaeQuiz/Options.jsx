// src/components/EdukaeQuiz/Options.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import "./Options.css";

const Options = ({ options, answer }) => {
  const [quizState, dispatch] = useContext(QuizContext);

  const handleClick = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer, option }
    });
  };

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button
          className={`option-btn ${quizState.answerSelected && option === answer ? "correct" : ""} ${quizState.answerSelected && option !== answer && option === quizState.answerSelected ? "wrong" : ""}`}
          onClick={() => handleClick(option)}
          key={index}
          disabled={quizState.removeBtns}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
