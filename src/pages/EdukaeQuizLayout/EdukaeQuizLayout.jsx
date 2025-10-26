// src/pages/EdukaeQuizLayout/EdukaeQuizLayout.jsx
import React, { useContext } from "react";
import { QuizContext } from "../../context/quiz";

// Componentes de layout
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Componentes do quiz
import Welcome from "../../components/EdukaeQuiz/Welcome";
import ChooseLang from "../../components/EdukaeQuiz/ChooseLang";
import Question from "../../components/EdukaeQuiz/Question";
import GameOver from "../../components/EdukaeQuiz/GameOver";

import "./EdukaeQuizLayout.css";

const EdukaeQuizLayout = () => {
  const [quizState] = useContext(QuizContext);

  return (
    <>
      <Navbar />

      <main className="quiz-layout-wrapper">
        <div className="quiz-box">
          {quizState.gameStage === "Start" && <Welcome />}
          {quizState.gameStage === "StartPlaying" && <ChooseLang />}
          {quizState.gameStage === "Playing" && <Question />}
          {quizState.gameStage === "End" && <GameOver />}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EdukaeQuizLayout;