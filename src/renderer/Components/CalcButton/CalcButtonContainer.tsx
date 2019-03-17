import React, { Component } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN } from '../../utils/buttonLabels';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { operatorRegExpAddDot, operatorRegExp, numRegExp } from '../../utils/regExps';
import { isDotWriting, getLastChar } from '../../utils/commons';

interface IProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    currentExpression : string;
};

class CalcButtonContainer extends Component<IProps> {
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
        const isWritingLeftParenthesisResult : boolean = lastChar === '(' && !this.isWritingLeftParenthesis();
        const isWritingRightParenthesisResult : boolean = lastChar === ')' && !this.isWritingRightParenthesis();

        return isFirstOperatorResult || isWritingOperatorResult || isDotWritingResult || isWritingLeftParenthesisResult || isWritingRightParenthesisResult;
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

    newCalculate = () => {
        const { currentExpression, calculate } = this.props;

        if(!isLastCharOperator(currentExpression)) {
            calculate(calculateUtil(currentExpression));
        }
    };

    // 연산자를 쓸 수 있는지 확인한다.
    isWritingOperator = (expression : string) : boolean => {
        const { currentExpression } = this.props;

        return isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(expression) ? false : true;
    };

    render() {
        const { currentExpression } = this.props;

        return <CalcButtonPresenter makeClickFunc={ this.makeClickFunc } isEmptyExpression={ currentExpression === '' } />;
    };
};

export default CalcButtonContainer;