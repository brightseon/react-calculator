import CalcResult from './CalcResultContainer';
import { connect } from 'react-redux';
import { CalcState } from '../../store/modules/calc/types';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    currentExpression : string;
    calculationResult : number;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    currentExpression : state.calc.currentExpression,
    calculationResult : state.calc.calculationResult
});

export default connect<IMapStateToProps>(mapStateToProps)(CalcResult);