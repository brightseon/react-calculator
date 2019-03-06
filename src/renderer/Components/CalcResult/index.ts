import CalcResult from './CalcResultContainer';
import { connect } from 'react-redux';
import { CalcState } from '../../store/modules/calc/types';

interface MapStateToProps {
    currentExpression : string;
};

const mapStateToProps = (state : CalcState) => ({
    currentExpression : state.currentExpression
});

export default connect<MapStateToProps>(mapStateToProps)(CalcResult);