import CalcResult from './CalcResultContainer';
import { connect } from 'react-redux';
import { CalcState } from '../../store/modules/calc/types';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    currentExpression : string;
    calculationResult : number;
    lastExpression : string;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    currentExpression : state.calc.currentExpression,
    calculationResult : state.calc.calculationResult,
    lastExpression : state.calc.lastExpression
});

export default connect<IMapStateToProps>(mapStateToProps)(CalcResult);