import React, { SFC } from 'react';
import ResultPresenter from './CalcResultPresenter';

interface IProps {
    currentExpression : string;
};

const CalcResultContainer : SFC<IProps> = ({ currentExpression }) => <ResultPresenter currentExpression={ currentExpression } />;

export default CalcResultContainer;