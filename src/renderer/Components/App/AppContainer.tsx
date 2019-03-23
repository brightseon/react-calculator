import React, { SFC } from 'react';
import AppPresenter from './AppPresenter';

interface IProps { 
    isOpenSidebar : boolean;
    openSidebar : () => void;
};

const AppContainer : SFC<IProps> = ({ isOpenSidebar, openSidebar }) => (
    <AppPresenter isOpenSidebar={ isOpenSidebar } openSidebar={ openSidebar } />
);

export default AppContainer;