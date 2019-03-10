import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';
import { LabelInfo, CLEAR_BTN, EQUAL_BTN, OPERATOR_BTN, NUMBER_BTN } from '../../utils/buttonLabels';
import { isFirstOperator } from '../../utils/calculate';

interface IProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : () => void;
    currentExpression : string;
};

const CalcButtonContainer : SFC<IProps> = ({ makeExpression, resetExpression, calculate, currentExpression }) => {
    const makeClickFunc = (buttonLabel : LabelInfo) : Function => {
        // let returnClickFunc : Function;
        
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
        const regExp = /[^\+\-\×\÷]/;

        if((currentExpression === '' && buttonLabel.text !== 0 && regExp.test(buttonLabel.text.toString()) || currentExpression !== '')) {
            return makeExpression;
        } else {
            return () => {};
        }
    };

    return <CalcButtonPresenter makeClickFunc={ makeClickFunc } />;
};

export default CalcButtonContainer;