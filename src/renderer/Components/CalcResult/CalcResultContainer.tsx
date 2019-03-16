import React, { SFC, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';
import { isFirstOperator, isLastCharOperator } from '../../utils/calculate';
import { notCalcButtonRegExp, operatorRegExpAddDot, expressionRegExp, zeroDotRegExp } from '../../utils/regExps';

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
        const newExpression = expression.indexOf('0') === 0 && !zeroDotRegExp.test(expression) ? expression.substring(1) : expression;             // 0이 첫번째로 오면, 첫 번째 0을 자른다
        
        if(newExpression === '') return resetExpression();

        if(isWritingOperator(newExpression) || isFirstOperator(newExpression)) {
            return;
        }

        if(!notCalcButtonRegExp.test(newExpression)) {
            const sendExpression = makeOperatorFormat(newExpression);

            makeExpression(null, sendExpression);
        }
    };

    const isWritingOperator = (expression : string) : boolean => {
        const currentTypingChar = expression.replace(currentExpression, '');

        return isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(currentTypingChar);
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

    const enterPress : KeyboardEventHandler = (e : KeyboardEvent<HTMLInputElement>) : void => {
        const { currentTarget : { value } } = e;

        if(e.key === 'Enter' && (!isLastCharOperator(value) || expressionRegExp.test(value))) {
            calculate();
        }
    };

    return <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } 
        typingExpression={ typingExpression } enterPress={ enterPress } />;
};

export default CalcResultContainer;