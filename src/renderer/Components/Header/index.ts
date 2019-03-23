import Header from './HeaderContainer';
import { connect } from 'react-redux';
import { openSidebar } from '../../redux/modules/sidebar/sidebar';
import { Dispatch } from 'redux';

interface IMapDispatchToProps {
    openSidebar : (isSetting : boolean) => void;
};

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    openSidebar : (isSetting : boolean) => dispatch(openSidebar(isSetting))
});

export default connect(null, mapDispatchToProps)(Header);