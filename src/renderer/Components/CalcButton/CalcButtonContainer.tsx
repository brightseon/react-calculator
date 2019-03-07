import React, { SFC } from 'react';
import CalcButtonPresenter from './CalcButtonPresenter';

interface IProps {
    makeExpression : (button : number | string) => void;
}

const CalcButtonContainer : SFC<IProps> = ({ makeExpression }) => <CalcButtonPresenter makeExpression={ makeExpression } />

export default CalcButtonContainer;