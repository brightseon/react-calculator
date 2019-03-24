import History from './HistoryContainer';
import { connect } from 'react-redux';
import { CalcHistoryType, CalcState } from '../../redux/modules/calc/types';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    calcHistory : CalcHistoryType[];
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    calcHistory : state.calc.calcHistory
});

export default connect(mapStateToProps)(History);