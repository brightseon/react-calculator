import CalcResult from './CalcResultContainer';
import { connect } from 'react-redux';
import { CalcState } from '../../store/modules/calc/types';

interface State {
    calc : CalcState;
};

interface IMapStateToProps {
    currentExpression : string;
};

const mapStateToProps = (state : State) : IMapStateToProps => ({
    currentExpression : state.calc.currentExpression
});

export default connect<IMapStateToProps>(mapStateToProps)(CalcResult);