import React, { SFC } from 'react';
import ResultPresenter from './CalcResultPresenter';

interface IProps {
    currentExpression : string;
    calculationResult : number;
};

const CalcResultContainer : SFC<IProps> = ({ currentExpression, calculationResult }) => 
    <ResultPresenter currentExpression={ currentExpression } calculationResult={ calculationResult } />;

export default CalcResultContainer;