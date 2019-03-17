import React, { Component, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { notCalcButtonRegExp, operatorRegExpAddDot, expressionRegExp, zeroDotRegExp, operatorRegExp, numRegExp } from '../../utils/regExps';
import { isDotWriting, getLastChar } from '../../utils/commons';

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
        const { resetExpression, makeExpression, currentExpression } = this.props;

        const { target : { value : expression } } = e;
        const newExpression : string = expression.indexOf('0') === 0 && !zeroDotRegExp.test(expression) ? expression.substring(1) : expression;             // 0이 첫번째로 오면, 첫 번째 0을 자른다
        
        if(newExpression === '') return resetExpression();

        if(currentExpression.length < newExpression.length && this.makeCondition(newExpression)) {
            return;
        }

        const sendExpression = this.makeOperatorFormat(newExpression);

        makeExpression(null, sendExpression);
    };
    
    // 방금 입력한 문자를 계산식에 넣을 수 있는지에 대한 조건을 만든다.
    makeCondition = (expression : string) : boolean => {
        const { currentExpression } = this.props;
        
        const isWritingOperatorResult = !this.isWritingOperator(expression);
        const isFirstOperatorResult = operatorRegExp.test(getLastChar(expression)) && isFirstOperator(expression);
        const isDotWritingResult = getLastChar(expression) === '.' && !isDotWriting(currentExpression);
        const isNotCalcButtonRegExp = notCalcButtonRegExp.test(expression);
        const isWritingLeftParenthesisResult = getLastChar(expression) === '(' && !this.isWritingLeftParenthesis();
        const isWritingRightParenthesisResult = getLastChar(expression) === ')' && !this.isWritingRightParenthesis();

        return (
            isWritingOperatorResult || isFirstOperatorResult || isDotWritingResult || 
            isNotCalcButtonRegExp || isWritingLeftParenthesisResult || isWritingRightParenthesisResult
        );
    };
    
    // (를 쓸 수 있는지 확인한다.
    isWritingLeftParenthesis = () : boolean => {
        const { currentExpression } = this.props;
        const lastChar = getLastChar(currentExpression);
        // 식이 비어있는지 확인(비어있으면 true, 아니면 false)
        const isLastCharEmptyStr = currentExpression === '';
        // 계산식의 마지막 문자가 +, -, *, /인지 확인(+, -, *, /이라면 true, 아니면 false)
        const isOperator = operatorRegExp.test(lastChar);
        // 계산식에 (가 있는지 확인(있으면 true, 없으면 false)
        const isLeftParenthesis = currentExpression.indexOf('(') !== -1;
        // 계산식에 )가 있는지 확인(없으면 true, 있으면 false)
        const isRightParenthesis = currentExpression.indexOf(')') === -1;
        // 마지막 문자가 )인지 확인(마지막 문자가 ')'라면 true, 아니면 false)
        const isLastCharRightParenthesis = lastChar === ')';

        if(!isLastCharEmptyStr && !isOperator || (isLeftParenthesis && isRightParenthesis) || isLastCharRightParenthesis) {
            return false;
        }

        return true;
    };

    // )를 쓸 수 있는지 확인한다.
    isWritingRightParenthesis = () : boolean => {
        const { currentExpression } = this.props;
        const lastChar = getLastChar(currentExpression);
        // 식이 비어있는지 확인(비어있다면 true, 아니면 false)
        const isEmptyExpression = currentExpression === '';
        // (가 있는지 확인(있다면 true, 없으면 false)
        const isLeftParenthesis = currentExpression.indexOf('(') !== -1;
        // 마지막 문자가 숫자인지 확인(숫자면 true, +, -, *, /, ., (, ) 이면 false)
        const isLastCharNum = numRegExp.test(lastChar);

        if(isEmptyExpression || !isLeftParenthesis || (isLeftParenthesis && !isLastCharNum)) {
            return false;
        }

        return true;
    };

    // 연산자를 쓸 수 있는지 확인한다.
    isWritingOperator = (expression : string) : boolean => {
        const { currentExpression } = this.props;
        const currentTypingChar = getLastChar(expression);

        return isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(currentTypingChar) ? false : true;
    };

    // *, /를 ×, ÷로 변환한다.
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
    };
};

export default CalcResultContainer;