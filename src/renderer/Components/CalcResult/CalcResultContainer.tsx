import React, { SFC, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    makeExpression : (button? : number | string, typingExpression? : number | string) => void;
    resetExpression : () => void;
    calculate : () => void;
};

const CalcResultContainer : SFC<IProps> = ({ currentExpression, calculationResult, lastExpression, makeExpression, resetExpression, calculate }) => {
    const typingExpression : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) : void => {
        e.preventDefault();

        const { target : { value : expression } } = e;
        const regExp = /[^0-9\+\-\*\/×÷]/g;

        if(!regExp.test(expression)) {
            const newExpression = expression.indexOf('0') === 0 ? expression.substring(1) : expression;

            if(newExpression) {
                const sendExpression = makeOperatorFormat(newExpression);

                makeExpression(null, sendExpression);
            } else {
                resetExpression();
            }
        }
    };

    const makeOperatorFormat = (expression : string) : string => {
        let returnExpression : string = expression;

        if(expression.indexOf('*') !== -1) {
            returnExpression = expression.replace('*', '×');
        } else if(expression.indexOf('/') !== -1) {
            returnExpression = expression.replace('/', '÷');
        }

        return returnExpression;
    };

    const enterPress : KeyboardEventHandler = (e : KeyboardEvent) : void => {
        if(e.key === 'Enter') {
            calculate();
        }
    };

    return <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } 
        typingExpression={ typingExpression } enterPress={ enterPress } />;
};

export default CalcResultContainer;