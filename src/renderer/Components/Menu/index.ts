import Menu from './Menu';
import { connect } from 'react-redux';
import { SidebarState } from '../../redux/modules/sidebar/types';

interface IState {
    sidebar : SidebarState;
};

interface IMapStateToProps {
    isSetting : boolean;
};

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    isSetting : state.sidebar.isSetting
});

export default connect(mapStateToProps)(Menu);