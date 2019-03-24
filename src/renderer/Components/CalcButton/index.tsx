import { connect } from 'react-redux';
import CaclButton from './CalcButtonContainer';
import { makeExpression, resetExpression, calculate, setHistory } from '../../redux/modules/calc/calc';
import { Dispatch } from 'redux';
import { CalcState } from '../../redux/modules/calc/types';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    currentExpression : string;
};

interface IMapDispatchToProps {
    makeExpression : (button : string) => void;
    resetExpression : () => void;
    calculate : (calcResult : number) => void;
    addHistory : (id : string) => void;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    currentExpression : state.calc.currentExpression
});

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    makeExpression : (button : string) => dispatch(makeExpression(button)),
    resetExpression : () => dispatch(resetExpression()),
    calculate : (calcResult : number) => dispatch(calculate(calcResult)),
    addHistory : (id : string) => dispatch(setHistory(id))
});

export default connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(CaclButton);