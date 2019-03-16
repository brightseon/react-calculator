import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN } from '../../utils/buttonLabels';
import { isFirstOperator, isLastCharOperator } from '../../utils/calculate';
import { operatorRegExpAddDot } from '../../utils/regExps';

interface IProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : () => void;
    currentExpression : string;
};

const CalcButtonContainer : SFC<IProps> = ({ makeExpression, resetExpression, calculate, currentExpression }) => {
    const makeClickFunc = (buttonLabel : LabelInfo) : Function => {
        switch(buttonLabel.labelType) {
            case CLEAR_BTN :
                return resetExpression;
            
            case EQUAL_BTN :
                return newCalculate;

            default :
                return newMakeExpression;
        }
    };

    const newMakeExpression = (buttonLabel : LabelInfo) : Function => {
        if((currentExpression === '' && !isFirstOperator(buttonLabel.text)) || currentExpression !== '' && !isWritingOperator(buttonLabel.text)) {
            return makeExpression;
        } else {
            return () => {};
        }
    };

    const newCalculate = () => {
        if(!isLastCharOperator(currentExpression)) {
            calculate();
        }
    };

    const isWritingOperator = (expression : string) : boolean => {
        return isLastCharOperator(currentExpression) && operatorRegExpAddDot.test(expression);
    };

    return <CalcButtonPresenter makeClickFunc={ makeClickFunc } isEmptyExpression={ currentExpression === '' } />;
};

export default CalcButtonContainer;