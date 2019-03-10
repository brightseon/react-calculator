import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN, OPERATOR_BTN, NUMBER_BTN } from '../../utils/buttonLabels';
import { isFirstOperator, isLastCharOperator } from '../../utils/calculate';

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
                return calculate;

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

    const isWritingOperator = (expression : string) : boolean => {
        const regExp = /[\+\-\*\/\.×÷]/;

        return isLastCharOperator(currentExpression) && regExp.test(expression);
    };

    return <CalcButtonPresenter makeClickFunc={ makeClickFunc } />;
};

export default CalcButtonContainer;