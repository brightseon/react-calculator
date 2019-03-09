import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';

interface IProps {
    makeExpression : (button : number | string) => void;
    resetExpression : () => void;
    calculate : () => void;
};

const CalcButtonContainer : SFC<IProps> = ({ makeExpression, resetExpression, calculate }) => 
    <CalcButtonPresenter makeExpression={ makeExpression } resetExpression={ resetExpression } calculate={ calculate } />;

export default CalcButtonContainer;