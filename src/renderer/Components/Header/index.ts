import Header from './HeaderContainer';
import { connect } from 'react-redux';
import { openSidebar } from '../../redux/modules/sidebar/sidebar';
import { Dispatch } from 'redux';
import { CalcState, CalcHistoryType } from '../../redux/modules/calc/types';

interface IState {
    calc : CalcState;
};

interface IMapStateToProps {
    calcHistory : CalcHistoryType[];
};

interface IMapDispatchToProps {
    openSidebar : (isSetting : boolean) => void;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    calcHistory : state.calc.calcHistory
});

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    openSidebar : (isSetting : boolean) => dispatch(openSidebar(isSetting))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);