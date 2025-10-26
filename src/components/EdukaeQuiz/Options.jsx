// src/components/EdukaeQuiz/Options.jsx

import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import "./Options.css";

const Options = ({ options, answer }) => {
  const [quizState, dispatch] = useContext(QuizContext);

  const handleClick = (option) => {
    // Only dispatch if no answer has been selected yet for this question
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
        let buttonClass = "option-btn";
        if (quizState.answerSelected) {
          if (option === answer) {
            buttonClass += " correct"; // Correct answer always gets 'correct' style after selection
          } else if (option === quizState.answerSelected) {
            buttonClass += " wrong"; // Only the selected wrong answer gets 'wrong' style
          } else {
            buttonClass += " disabled"; // Other options get disabled style
          }
        }

        return (
          <button
            className={buttonClass}
            onClick={() => handleClick(option)}
            key={index}
            // Disable button after an answer is selected
            disabled={quizState.answerSelected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;