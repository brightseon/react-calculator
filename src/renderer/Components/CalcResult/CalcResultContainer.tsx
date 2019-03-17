import React, { Component, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { notCalcButtonRegExp, operatorRegExpAddDot, expressionRegExp, zeroDotRegExp } from '../../utils/regExps';
import { isDotWriting } from '../../utils/commons';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    makeExpression : (button? : number | string, typingExpression? : number | string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
};

class CalcResultContainer extends Component<IProps> {
    typingExpression : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) : void => {
        e.preventDefault();
        const { resetExpression, makeExpression } = this.props;

        const { target : { value : expression } } = e;
        const newExpression : string = expression.indexOf('0') === 0 && !zeroDotRegExp.test(expression) ? expression.substring(1) : expression;             // 0이 첫번째로 오면, 첫 번째 0을 자른다
        
        if(newExpression === '') return resetExpression();

        if(this.makeCondition(newExpression)) {
            return;
        }

        if(!notCalcButtonRegExp.test(newExpression)) {
            const sendExpression = this.makeOperatorFormat(newExpression);

            makeExpression(null, sendExpression);
        }
    };

    makeCondition = (expression : string) : boolean => {
        const { currentExpression } = this.props;

        const isWritingOperatorResult = !this.isWritingOperator(expression);
        const isFirstOperatorResult = isFirstOperator(expression);
        const isDotWritingResult = expression.charAt(expression.length - 1) === '.' && !isDotWriting(currentExpression);

        return isWritingOperatorResult || isFirstOperatorResult || isDotWritingResult;
    };

    isWritingOperator = (expression : string) : boolean => {
        const { currentExpression } = this.props;
        const currentTypingChar = expression.charAt(expression.length - 1);

        return isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(currentTypingChar) ? false : true;
    };

    makeOperatorFormat = (expression : string) : string => {
        let returnExpression : string = expression;

        if(expression.indexOf('*') !== -1) {
            returnExpression = expression.replace('*', '×');
        } else if(expression.indexOf('/') !== -1) {
            returnExpression = expression.replace('/', '÷');
        }

        return returnExpression;
    };

    enterPress : KeyboardEventHandler = (e : KeyboardEvent<HTMLInputElement>) : void => {
        const { currentTarget : { value } } = e;
        const { calculate, currentExpression } = this.props;

        if(e.key === 'Enter' && (!isLastCharOperator(value) || expressionRegExp.test(value))) {
            calculate(calculateUtil(currentExpression));
        }
    };

    render() {
        const { currentExpression, calculationResult, lastExpression } = this.props;

        return <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } 
            typingExpression={ this.typingExpression } enterPress={ this.enterPress } />;
    }
};

export default CalcResultContainer;