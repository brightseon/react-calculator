import React, { Component, MouseEventHandler } from 'react';
import HeaderPresenter from './HeaderPresenter';
import { ipcRenderer } from 'electron';

interface IProps {
    openSidebar : (isSetting : boolean) => void;
};

class HeaderContainer extends Component<IProps> {

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
        const { closeWindow, maximizeWindow, minimizeWindow, props : { openSidebar } } = this;

        return <HeaderPresenter closeWindow={ closeWindow } maximizeWindow={ maximizeWindow } minimizeWindow={ minimizeWindow }
            openSidebar={ openSidebar } />;
    };
};

export default HeaderContainer;