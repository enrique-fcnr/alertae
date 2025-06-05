import { createContext, useReducer } from "react";
import questions from "../data/questions_complete.js";

// Estágios do quiz
const STAGES = ['Start', 'StartPlaying', 'Playing', 'End'];

// Estado inicial do quiz
const initialState = {
  gameStage: STAGES[0],
  questions: questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
  showTip: false,
  removeBtns: false,
  changeCategory: 0,
  filteredAnswered: 0
};

// Reducer do quiz
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'CHOOSE_LANG':
      return { ...state, gameStage: STAGES[1] };

    case 'CHANGE_STATE_HTML':
      return {
        ...state,
        gameStage: STAGES[2],
        questions: questions[0],
        changeCategory: 0,
        currentQuestion: 0,
        score: 0
      };

    case 'CHANGE_STATE_CSS':
      return {
        ...state,
        gameStage: STAGES[2],
        questions: questions[1],
        changeCategory: 1,
        currentQuestion: 0,
        score: 0
      };

    case 'CHANGE_STATE_JAVASCRIPT':
      return {
        ...state,
        gameStage: STAGES[2],
        questions: questions[2],
        changeCategory: 2,
        currentQuestion: 0,
        score: 0
      };

    case 'CHANGE_QUESTION':
      const nextQuestion = state.currentQuestion + 1;
      const isEnd = nextQuestion >= state.questions.questions.length;
      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: isEnd ? STAGES[3] : state.gameStage,
        answerSelected: false,
        showTip: false,
        removeBtns: false
      };

    case 'CHECK_ANSWER':
      if (state.answerSelected) return state;
      const { answer, option } = action.payload;
      const isCorrect = answer === option ? 1 : 0;
      return {
        ...state,
        score: state.score + isCorrect,
        answerSelected: option,
        removeBtns: true
      };

    case 'EXCLUIR_UM':
      let options = [...state.questions.questions[state.currentQuestion].options];
      if (options.length > 2) {
        options.pop();
      }
      return {
        ...state,
        filteredAnswered: options,
        removeBtns: true
      };

    case 'MOSTRAR_DICA':
      return {
        ...state,
        showTip: true
      };

    case 'NEW_GAME':
      return initialState;

    default:
      return state;
  }
};

// Criação do contexto
export const QuizContext = createContext();

// Provider para envolver a aplicação
export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
