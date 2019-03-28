import React, { Component, ChangeEventHandler, ChangeEvent, KeyboardEventHandler, KeyboardEvent, createRef, Ref, MouseEventHandler, MouseEvent } from 'react';
import ResultPresenter from './CalcResultPresenter';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { notCalcButtonRegExp, operatorRegExpAddDot, expressionRegExp, zeroDotRegExp, operatorRegExp, numRegExpAddDot } from '../../utils/regExps';
import { isDotWriting, getLastChar, isWritingLeftParenthesis, isWritingRightParenthesis, makeUniqueId } from '../../utils/commons';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
    makeExpression : (button? : number | string, typingExpression? : number | string) => void;
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

    componentDidUpdate = () => {
        this.calcResultRef.current.focus();
    };

    typingExpression : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) : void => {
        const { resetExpression, makeExpression } = this.props;

        const { target : { value : expression } } = e;
        const newExpression : string = expression.indexOf('0') === 0 && !zeroDotRegExp.test(expression) ? expression.substring(1) : expression;             // 0이 첫번째로 오면, 첫 번째 0을 자른다
        
        if(newExpression === '') return resetExpression();

        if(this.makeCondition(newExpression)) {
            return;
        }

        const sendExpression = this.makeOperatorFormat(newExpression);

        makeExpression(null, sendExpression);
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
        const { calculate, currentExpression, setHistory } = this.props;

        if(e.key === 'Enter' && (!isLastCharOperator(value) || expressionRegExp.test(value))) {
            calculate(calculateUtil(currentExpression));
            setHistory(makeUniqueId());
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
        const { currentExpression } = this.props;
        const len = currentExpression.length;
        
        e.preventDefault();
        
        this.calcResultRef.current.focus();
        this.calcResultRef.current.setSelectionRange(len + 1, len + 1);
    };

    render() {
        const { currentExpression, calculationResult, lastExpression, openSidebar } = this.props;

        return <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } 
            typingExpression={ this.typingExpression } enterPress={ this.enterPress } calcResultRef={ this.calcResultRef } 
            copyExpression={ this.copyExpression } lastExpressionRef={ this.lastExpressionRef } openSidebar={ openSidebar } clickCalcResult={ this.clickCalcResult } />;
    };
};

export default CalcResultContainer;