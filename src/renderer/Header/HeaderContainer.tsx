import React, { Component, MouseEventHandler } from 'react';
import HeaderPresenter from './HeaderPresenter';
import { ipcRenderer } from 'electron';

class HeaderContainer extends Component {

    closeWindow : React.MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-close');
    };

    maximizeWindow : React.MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-maximize');
    };

    minimizeWindow : React.MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-minimize');
    }

    render() {
        const { closeWindow, maximizeWindow, minimizeWindow } = this;

        return <HeaderPresenter closeWindow={ closeWindow } maximizeWindow={ maximizeWindow } minimizeWindow={ minimizeWindow } />;
    };
}

export default HeaderContainer;