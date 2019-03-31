import CheckBox from './CheckBox';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeCheckValue } from '../../redux/modules/calc/calc';

interface IMapDispatchToProps {
    clickCheckBox : (id : string) => void;
};

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    clickCheckBox : (id : string) => dispatch(changeCheckValue(id))
});

export default connect(null, mapDispatchToProps)(CheckBox);