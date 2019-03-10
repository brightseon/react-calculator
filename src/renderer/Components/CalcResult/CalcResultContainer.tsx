import React, { SFC, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';
import { isFirstOperator, isLastCharOperator } from '../../utils/calculate';

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
        const newExpression = expression.indexOf('0') === 0 ? expression.substring(1) : expression;             // 0이 첫번째로 오면, 첫 번째 0을 자른다
        const regExp = /[^0-9\+\-\*\/×÷\(\)\.]/g;

        if(isWritingOperator(expression)) {
            return;
        }

        if(!regExp.test(newExpression) && !isFirstOperator(newExpression)) {
            if(newExpression) {
                const sendExpression = makeOperatorFormat(newExpression);

                makeExpression(null, sendExpression);
            } else {
                resetExpression();
            }
        }
    };

    const isWritingOperator = (expression : string) : boolean => {
        const regExp = /[\+\-\*\/\.]/;
        const currentTypingChar = expression.replace(currentExpression, '');

        return isLastCharOperator(currentExpression) && regExp.test(currentTypingChar);
    };

    // 자판으로 쳤을 경우, *와 /를 ×과 ÷로 바꿔주는 함수
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