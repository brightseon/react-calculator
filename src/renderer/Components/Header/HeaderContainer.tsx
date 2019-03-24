import React, { Component, MouseEventHandler } from 'react';
import HeaderPresenter from './HeaderPresenter';
import { ipcRenderer } from 'electron';
import { CalcHistoryType } from '../../redux/modules/calc/types';

interface IProps {
    openSidebar : (isSetting : boolean) => void;
    calcHistory : CalcHistoryType[];
};

class HeaderContainer extends Component<IProps> {
    shouldComponentUpdate = () : boolean => {
        return false;
    };

    closeWindow : MouseEventHandler<HTMLDivElement> = () : void => {
        const { calcHistory } = this.props;

        localStorage.setItem('history', JSON.stringify(calcHistory));
        ipcRenderer.send('window-close');
    };

    maximizeWindow : MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-maximize');
    };

    minimizeWindow : MouseEventHandler<HTMLDivElement> = () : void => {
        ipcRenderer.send('window-minimize');
    };

    render() {
        const { closeWindow, maximizeWindow, minimizeWindow, props : { openSidebar } } = this;

        return <HeaderPresenter closeWindow={ closeWindow } maximizeWindow={ maximizeWindow } minimizeWindow={ minimizeWindow }
            openSidebar={ openSidebar } />;
    };
};

export default HeaderContainer;