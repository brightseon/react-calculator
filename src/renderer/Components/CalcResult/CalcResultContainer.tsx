import React, { SFC } from 'react';
import ResultPresenter from './CalcResultPresenter';

interface IProps {
    currentExpression : string;
};

const CalcResultContainer : SFC<IProps> = ({ currentExpression }) => {
    console.log(currentExpression);
    return <ResultPresenter />;
}


export default CalcResultContainer;