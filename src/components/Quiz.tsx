import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';
// Hint: Take advantage of the QuizQuestion interface

interface QuizState {
  //questions: QuizQuestion[]
  currentQuestion: QuizQuestion | null
  selectedAnswer: string | null
  //score: number
}
let core : QuizCore = new QuizCore();

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  // const initialQuestions: QuizQuestion[] = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['London', 'Berlin', 'Paris', 'Madrid'],
  //     correctAnswer: 'Paris',
  //   },
  // ];

  const [state, setState] = useState<QuizState>({
  //   questions: initialQuestions,
    currentQuestion: core.getCurrentQuestion(),  // Initialize the current question.
    selectedAnswer: null,  // Initialize the selected answer.
  //  score: 0,  // Initialize the score.
  });

  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }

  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    if(state.selectedAnswer != null)
      core.answerQuestion(state.selectedAnswer);

    if(core.hasNextQuestion()){
      core.nextQuestion();
      setState({
        currentQuestion: core.getCurrentQuestion(),
        selectedAnswer: null,
      });
    } else {
      setQuizCompleted(true);
    }
  } 

  //const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  //const currentQuestion = questions[currentQuestionIndex];

  if (quizCompleted || !state.currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {core.getScore()} out of {core.getTotalQuestions()}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{state.currentQuestion.question ?? 'No Question'}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {state.currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={state.selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{state.selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>{core.hasNextQuestion() ? 'Next Question' : 'Submit'}</button>
    </div>
  );
};

export default Quiz;