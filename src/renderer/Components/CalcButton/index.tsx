import { connect } from 'react-redux';
import CaclButton from './CalcButtonContainer';
import { clickButton } from '../../store/modules/calc/calc';
import { Dispatch } from 'redux';

interface IMapStateToProps {}

interface IMapDispatchToProps {
    clickButton : (button : number | string) => void;
};

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    clickButton : (button : number | string) => dispatch(clickButton(button))
});

export default connect<IMapStateToProps, IMapDispatchToProps>(null, mapDispatchToProps)(CaclButton);