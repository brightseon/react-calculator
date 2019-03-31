import CalcResult from './CalcResultContainer';
import { connect } from 'react-redux';
import { CalcState } from '../../redux/modules/calc/types';
import { makeExpression, resetExpression, calculate, setHistory } from '../../redux/modules/calc/calc';
import { openSidebar } from '../../redux/modules/sidebar/sidebar';
import { Dispatch } from 'redux';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
};

interface IMapDispatchToProps {
    makeExpression : (expression : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    openSidebar : (isSetting : boolean) => void;
    setHistory : (id : string) => void;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    currentExpression : state.calc.currentExpression,
    calculationResult : state.calc.calculationResult,
    lastExpression : state.calc.lastExpression
});

const mapDispatchToProps  = (dispatch : Dispatch) : IMapDispatchToProps => ({
    makeExpression : (expression : string) => dispatch(makeExpression(expression)),
    resetExpression : () => dispatch(resetExpression()),
    calculate : (calcResult) => dispatch(calculate(calcResult)),
    openSidebar : (isSetting : boolean) => dispatch(openSidebar(isSetting)),
    setHistory : (id : string) => dispatch(setHistory(id))
});

export default connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(CalcResult);