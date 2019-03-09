import React, { SFC } from 'react';
import ResultPresenter from './CalcResultPresenter';

interface IProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
};

const CalcResultContainer : SFC<IProps> = ({ currentExpression, calculationResult, lastExpression }) => 
    <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } lastExpression={ lastExpression } />;

export default CalcResultContainer;