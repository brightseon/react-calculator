import React, { Component } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN } from '../../utils/buttonLabels';
import { isFirstOperator, isLastCharOperator, calculate as calculateUtil } from '../../utils/calculate';
import { operatorRegExpAddDot } from '../../utils/regExps';
import { isDotWriting } from '../../utils/commons';

interface IProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    currentExpression : string;
};

class CalcButtonContainer extends Component<IProps> {
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
        const { makeExpression, currentExpression } = this.props;

        if((currentExpression === '' && isFirstOperator(buttonLabel.text) || (currentExpression !== '' && !this.isWritingOperator(buttonLabel.text) || (buttonLabel.text === '.' && !isDotWriting(currentExpression))))) {
            return () => {};
        }

        return makeExpression;
    };

    newCalculate = () => {
        const { currentExpression, calculate } = this.props;

        if(!isLastCharOperator(currentExpression)) {
            calculate(calculateUtil(currentExpression));
        }
    };

    isWritingOperator = (expression : string) : boolean => {
        const { currentExpression } = this.props;

        return (isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(expression)) ? false : true;
    };

    render() {
        const { currentExpression } = this.props;

        return <CalcButtonPresenter makeClickFunc={ this.makeClickFunc } isEmptyExpression={ currentExpression === '' } />;
    };
};

export default CalcButtonContainer;