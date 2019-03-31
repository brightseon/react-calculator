import History from './HistoryContainer';
import { connect } from 'react-redux';
import { CalcHistoryType, CalcState } from '../../redux/modules/calc/types';
import { resetHistory } from '../../redux/modules/calc/calc';
import { Dispatch } from 'redux';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    calcHistory : CalcHistoryType[];
};

interface IMapDispatchToProps {
    allRemoveHistory : () => void;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    calcHistory : state.calc.calcHistory
});

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    allRemoveHistory : () => dispatch(resetHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(History);