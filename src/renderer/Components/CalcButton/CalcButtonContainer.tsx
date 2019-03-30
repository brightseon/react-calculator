import React, { Component } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN } from '../../utils/buttonLabels';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { operatorRegExpAddDot, numRegExpAddDot } from '../../utils/regExps';
import { isDotWriting, isWritingLeftParenthesis, isWritingRightParenthesis, getLastChar, makeUniqueId } from '../../utils/commons';

interface IProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    currentExpression : string;
    addHistory : (id : string) => void;
};

class CalcButtonContainer extends Component<IProps> {
    shouldComponentUpdate = () : boolean => {
        return false;
    };

    // 누른 버튼에 따라 onClick 이벤트를 결정
    makeClickFunc = (buttonLabel : LabelInfo) : Function => {
        const { resetExpression } = this.props;

        switch(buttonLabel.labelType) {
            case CLEAR_BTN :
                return resetExpression;
            
            case EQUAL_BTN :
                return this.newCalculate;

            default :
                return this.newMakeExpression;
        }
    };

    newMakeExpression = (buttonLabel : LabelInfo) : Function => {
        const { makeExpression } = this.props;

        if(this.makeCondition(buttonLabel.text)) {
            return () => {};
        }

        return makeExpression;
    };

    // 방금 입력한 문자를 계산식에 넣을 수 있는지에 대한 조건을 만든다.
    makeCondition = (lastChar : string) : boolean => {
        const { currentExpression } = this.props;

        const isFirstOperatorResult : boolean = currentExpression === '' && isFirstOperator(lastChar);
        const isWritingOperatorResult : boolean = currentExpression !== '' && !this.isWritingOperator(lastChar);
        const isDotWritingResult : boolean = lastChar === '.' && !isDotWriting(currentExpression);
        const isWritingLeftParenthesisResult : boolean = lastChar === '(' && !isWritingLeftParenthesis(currentExpression);
        const isWritingRightParenthesisResult : boolean = lastChar === ')' && !isWritingRightParenthesis(currentExpression);
        const isNumTyping = getLastChar(currentExpression) === ')' && numRegExpAddDot.test(lastChar);

        return (
            isFirstOperatorResult || isWritingOperatorResult || isDotWritingResult || 
            isWritingLeftParenthesisResult || isWritingRightParenthesisResult || isNumTyping
        );
    };

    newCalculate = () => {
        const { currentExpression, calculate, addHistory } = this.props;

        if(!isLastCharOperator(currentExpression)) {
            const result = calculateUtil(currentExpression);

            if(result || result === 0) {
                calculate(result);
                addHistory(makeUniqueId());
            }
        }
    };

    // 연산자를 쓸 수 있는지 확인한다.
    isWritingOperator = (expression : string) : boolean => {
        const { currentExpression } = this.props;
        const isOperator = operatorRegExpAddDot.test(expression);
        const lastChar = getLastChar(currentExpression);

        return (isLastCharOperator(currentExpression) && isOperator) || (getLastChar(currentExpression) === '(' && isOperator) ? false : true;
    };

    render() {
        const { currentExpression } = this.props;

        return <CalcButtonPresenter makeClickFunc={ this.makeClickFunc } isEmptyExpression={ currentExpression === '' } />;
    };
};

export default CalcButtonContainer;