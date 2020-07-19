import React, { useState } from 'react';
//API
import { fetchQuizQuestions } from './api/API';
//Components
import QuestionCard from './components/QuestionCard/QuestionCard';

//Types
import { QuestionState, Difficulty } from './api/API';

//styles
import { GlobalStyle } from './App.styles';
import { Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [ loading, setLoading ] = useState( false );
  const [ questions, setQuestions ] = useState<QuestionState[]>( [] );
  const [ questionNumber, setQuestionNumber ] = useState(0);
  const [ userAnswers, setUserAnswers ] = useState<AnswerObject[]>([]);
  const [ score, setScore ] = useState(0);
  const [ gameOver, setGameOver ] = useState(true);

  //console.log( questions );
  
  const startTrivia = async() => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions( TOTAL_QUESTIONS, Difficulty.EASY );
    setQuestions( newQuestions );
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if( !gameOver ) {
      //Users answers
      const answer = e.currentTarget.value;
      //check the answer against the correct answer
      const correct = questions[questionNumber].correct_answer === answer;
      // Add score if answer is correct
      if( correct ) setScore( prev => prev + 1);
      //Save answer in the array for user answers
      const answerObject = { 
        question: questions[questionNumber].question,
        answer,
        correct,
        correct_answer: questions[questionNumber].correct_answer,
      };
      setUserAnswers( (prev) => [...prev, answerObject] );
    }
  }

  const nextQuestion = () => {
    //move on the next question if not the last question
    const nextQuestion = questionNumber + 1;
    if( nextQuestion === TOTAL_QUESTIONS ) {
      setGameOver(true);
    } else {
      setQuestionNumber( nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>Start</button>
        ): null }
        
        {!gameOver ? <p className="score">Score: {score}</p> : null }
        { loading ? <p>Loading Questions....</p> : null }
        { !loading && !gameOver ? (
          <QuestionCard 
            questionNr={ questionNumber + 1 }
            totalQuestions={ TOTAL_QUESTIONS }
            question={ questions[questionNumber].question }
            answers={ questions[ questionNumber].answers }
            userAnswer={ userAnswers ? userAnswers[ questionNumber ] : undefined }
            callback={ checkAnswer }
          /> 
        ): null }
        { !loading && !gameOver && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
        ): null}
      </Wrapper>
    </>
  );
}

export default App;
