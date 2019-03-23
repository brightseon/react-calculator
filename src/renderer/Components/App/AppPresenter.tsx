import React, { SFC } from 'react';
import styles from './styles.scss';
import Header from '../Header';
import Home from '../Home';
import Sidebar from 'react-sidebar';
import Menu from '../Menu';

interface IProps {
    isOpenSidebar : boolean;
    openSidebar : () => void;
};

const sidebarStyles = {
    sidebar : {
        width : '80%', 
        backgroundColor : 'white', 
        zIndex : '10'
    },
    content : { 
        display : 'flex', 
        flexDirection : 'column'
    }
};

const AppPresenter : SFC<IProps> = ({ isOpenSidebar, openSidebar }) => (
    <div className={ styles.appBox }>
        <Sidebar sidebar={ <Menu /> } open={ isOpenSidebar } onSetOpen={ openSidebar } styles={ sidebarStyles }>
            <Header />
            <Home />
        </Sidebar>
    </div>
);

export default AppPresenter;