import React, { Component, MouseEventHandler } from 'react';
import HeaderPresenter from './HeaderPresenter';
import { ipcRenderer } from 'electron';

class HeaderContainer extends Component {

    closeWindow : MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-close');
    };

    maximizeWindow : MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-maximize');
    };

    minimizeWindow : MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-minimize');
    }

    render() {
        const { closeWindow, maximizeWindow, minimizeWindow } = this;

        return <HeaderPresenter closeWindow={ closeWindow } maximizeWindow={ maximizeWindow } minimizeWindow={ minimizeWindow } />;
    };
}

export default HeaderContainer;