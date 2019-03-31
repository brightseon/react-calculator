import React, { Component, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent, createRef, MouseEventHandler, MouseEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { notCalcButtonRegExp, operatorRegExpAddDot, expressionRegExp, operatorRegExp, numRegExpAddDot, numRegExp } from '../../utils/regExps';
import { isDotWriting, getLastChar, isWritingLeftParenthesis, isWritingRightParenthesis, makeUniqueId, getLastSecondChar } from '../../utils/commons';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    makeExpression : (expression : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    openSidebar : (isSetting : boolean) => void;
    setHistory : (id : string) => void;
};

class CalcResultContainer extends Component<IProps> {
    calcResultRef = createRef<HTMLInputElement>();
    lastExpressionRef = createRef<HTMLInputElement>();

    shouldComponentUpdate = (nextProps : Readonly<IProps>) : boolean => {
        if(this.props.lastExpression !== nextProps.lastExpression || this.props.currentExpression !== nextProps.currentExpression || this.props.calculationResult !== nextProps.calculationResult) {
            return true;
        }

        return false;
    };

    componentDidMount = () => {
        this.makeCursorPosition();
    };

    componentDidUpdate = () => {
        this.makeCursorPosition();
    };

    typingExpression : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) : void => {
        const { resetExpression, makeExpression } = this.props;

        const { target : { value : expression } } = e;
        const newExpression = this.makeNewExpression(expression);

        if(newExpression === '') return resetExpression();

        if(this.makeCondition(newExpression)) {
            return;
        }

        const sendExpression = this.makeOperatorFormat(newExpression);

        makeExpression(sendExpression);
    };

    makeNewExpression = (expression : string) : string => {
        const { currentExpression } = this.props;
        const lastChar = getLastChar(expression);
        
        // 0이 첫번째로 오면, 첫 번째 0을 자른다.
        if(expression.indexOf('0') === 0 && !operatorRegExpAddDot.test(expression)) {
            return expression.substring(1);
        }

        if(operatorRegExp.test(getLastSecondChar(currentExpression)) && getLastChar(currentExpression) === '0' && numRegExp.test(lastChar)) {
            return currentExpression.substring(0, currentExpression.length - 1) + lastChar;
        }

        return expression;
    };
    
    // 방금 입력한 문자를 계산식에 넣을 수 있는지에 대한 조건을 만든다.
    makeCondition = (expression : string) : boolean => {
        const { currentExpression } = this.props;
        const typingChar = getLastChar(expression);
        const expressionLastChar = getLastChar(currentExpression);
        
        const isExpressionDelete = currentExpression.length < expression.length;
        const isWritingOperatorResult = !this.isWritingOperator(expression);
        const isFirstOperatorResult = operatorRegExp.test(typingChar) && isFirstOperator(expression);
        const isDotWritingResult = typingChar === '.' && !isDotWriting(currentExpression);
        const isNotCalcButtonRegExp = notCalcButtonRegExp.test(expression);
        const isWritingLeftParenthesisResult = typingChar === '(' && !isWritingLeftParenthesis(currentExpression);
        const isWritingRightParenthesisResult = typingChar === ')' && !isWritingRightParenthesis(currentExpression);
        const isNumTyping = expressionLastChar === ')' && numRegExpAddDot.test(typingChar);

        return isExpressionDelete && (
            isWritingOperatorResult || isFirstOperatorResult || isDotWritingResult || 
            isNotCalcButtonRegExp || isWritingLeftParenthesisResult || isWritingRightParenthesisResult || isNumTyping
        );
    };
    
    // 연산자를 쓸 수 있는지 확인한다.
    isWritingOperator = (expression : string) : boolean => {
        const { currentExpression } = this.props;
        const currentTypingChar = getLastChar(expression);
        const isOperator = operatorRegExpAddDot.test(currentTypingChar);

        return (isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(currentTypingChar)) || (getLastChar(currentExpression) === '(' && isOperator) ? false : true;
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
        const { calculate, currentExpression, setHistory } = this.props;

        if(e.key === 'Enter' && (!isLastCharOperator(value) || expressionRegExp.test(value))) {
            const result = calculateUtil(currentExpression);

            if(result || result === 0) {
                calculate(result);
                setHistory(makeUniqueId());
            }
        }
    };

    // 계산식을 클립보드로 복사
    copyExpression = () => {
        const { lastExpression } = this.props;

        if(lastExpression) {
            this.lastExpressionRef.current.select();
            document.execCommand('Copy');
        }
    };

    clickCalcResult : MouseEventHandler = (e : MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        this.makeCursorPosition();
    };

    makeCursorPosition = () => {
        const { currentExpression } = this.props;
        let len : number = currentExpression.length;
        len = len * 2 + 1;

        this.calcResultRef.current.focus();
        this.calcResultRef.current.setSelectionRange(len, len);
    };

    render() {
        const { currentExpression, calculationResult, lastExpression, openSidebar } = this.props;

        return <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } 
            typingExpression={ this.typingExpression } enterPress={ this.enterPress } calcResultRef={ this.calcResultRef } 
            copyExpression={ this.copyExpression } lastExpressionRef={ this.lastExpressionRef } openSidebar={ openSidebar } clickCalcResult={ this.clickCalcResult } />;
    };
};

export default CalcResultContainer;