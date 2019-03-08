import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';

interface IProps {
    makeExpression : (button : number | string) => void;
    resetExpression : () => void;
};

const CalcButtonContainer : SFC<IProps> = ({ makeExpression, resetExpression }) => <CalcButtonPresenter makeExpression={ makeExpression } resetExpression={ resetExpression } />;

export default CalcButtonContainer;