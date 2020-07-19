import React from 'react';
//Types
import { AnswerObject } from '../../App';

//Styles
import {Wrapper, ButtonWrapper} from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

// FC -> functional comonent
const QuestionCard: React.FC<Props> = ({ 
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions
    }) => ( //implicit statement don't need to write return implicitly
    <Wrapper>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}} />
        <div>
            { answers.map( (answer) => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correct_answer === answer }
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={!!userAnswer /*!! to convert to boolean*/} value={answer} onClick={callback} >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
)

export default QuestionCard;