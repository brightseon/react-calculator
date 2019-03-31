import History from './HistoryContainer';
import { connect } from 'react-redux';
import { CalcHistoryType, CalcState } from '../../redux/modules/calc/types';
import { removeHistory, resetHistory } from '../../redux/modules/calc/calc';
import { Dispatch } from 'redux';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    calcHistory : CalcHistoryType[];
};

interface IMapDispatchToProps {
    allRemoveHistory : () => void;
    removeHistory : () => void;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    calcHistory : state.calc.calcHistory
});

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    allRemoveHistory : () => dispatch(resetHistory()),
    removeHistory : () => dispatch(removeHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(History);