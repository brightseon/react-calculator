import App from './AppContainer';
import { connect } from 'react-redux';
import { SidebarState } from '../../redux/modules/sidebar/types';
import { openSidebar } from '../../redux/modules/sidebar/sidebar';
import { Dispatch } from 'redux';

interface IState {
    sidebar : SidebarState;
};

interface IMapStateToProps {
    isOpenSidebar : boolean;
};

interface IMapDispatchToProps {
    openSidebar : (isSetting : boolean) => void;
}

const mapStateToProps = (state : IState) : IMapStateToProps => ({
    isOpenSidebar : state.sidebar.isOpenSidebar
});

const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => ({
    openSidebar : (isSetting : boolean) => dispatch(openSidebar(isSetting))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);