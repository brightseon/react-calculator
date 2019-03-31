import React, { Component } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN } from '../../utils/buttonLabels';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { operatorRegExpAddDot, numRegExpAddDot, operatorRegExp, numRegExp } from '../../utils/regExps';
import { isDotWriting, isWritingLeftParenthesis, isWritingRightParenthesis, getLastChar, makeUniqueId, getLastSecondChar } from '../../utils/commons';

interface IProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    currentExpression : string;
    addHistory : (id : string) => void;
};

class CalcButtonContainer extends Component<IProps> {
    shouldComponentUpdate = (nextProps : Readonly<IProps>) : boolean => {
        if(nextProps.currentExpression.length < 2) {
            return true;
        }

        return false;
    };

    clickButton = (buttonLabel : LabelInfo) => {
        const { resetExpression } = this.props;

        switch(buttonLabel.labelType) {
            case CLEAR_BTN : 
                resetExpression();
                break;

            case EQUAL_BTN :
                this.newCalculate();
                break;

            default :
                this.newMakeExpression(buttonLabel);
                break;
        }
    };

    newMakeExpression = (buttonLabel : LabelInfo) => {
        const { makeExpression } = this.props;

        if(!this.makeCondition(buttonLabel.text)) {
            const text = this.makeButtonText(buttonLabel.text);
            makeExpression(text);
        }
    };

    makeButtonText = (text : string) : string => {
        const { currentExpression } = this.props;
        let expression = currentExpression;

        if(expression === '' && text === '.') {
            return '0.';
        }

        if(operatorRegExp.test(getLastSecondChar(expression)) && getLastChar(expression) === '0' && numRegExp.test(text)) {
            return expression.substring(0, expression.length - 1) + text;
        }

        return expression + text;
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

        return (isLastCharOperator(currentExpression) && isOperator) || (getLastChar(currentExpression) === '(' && isOperator) ? false : true;
    };

    render() {
        return <CalcButtonPresenter clickButton={ this.clickButton } />;
    };
};

export default CalcButtonContainer;