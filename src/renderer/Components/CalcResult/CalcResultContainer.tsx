import React, { SFC, ChangeEventHandler, ChangeEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    makeExpression : (button? : number | string, typingExpression? : number | string) => void;
    resetExpression : () => void;
};

const CalcResultContainer : SFC<IProps> = ({ currentExpression, calculationResult, lastExpression, makeExpression, resetExpression }) => {
    const typingExpression : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) : void => {
        e.preventDefault();

        const { target : { value : expression } } = e;
        const regExp = /[^0-9\+\-\*\/]/g;

        if(!regExp.test(expression)) {
            const newExpression = expression.indexOf('0') === 0 ? expression.substring(1) : expression;

            if(newExpression) {
                makeExpression(null, newExpression);
            } else {
                resetExpression();
            }
        }
    };

    return <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } typingExpression={ typingExpression } />;
};

export default CalcResultContainer;