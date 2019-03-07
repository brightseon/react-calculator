import { connect } from 'react-redux';
import CaclButton from './CalcButtonContainer';
import { makeExpression } from '../../store/modules/calc/calc';
import { Dispatch } from 'redux';

interface IMapStateToProps {}

interface IMapDispatchToProps {
    makeExpression : (button : number | string) => void;
};

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    makeExpression : (button : number | string) => dispatch(makeExpression(button))
});

export default connect<IMapStateToProps, IMapDispatchToProps>(null, mapDispatchToProps)(CaclButton);