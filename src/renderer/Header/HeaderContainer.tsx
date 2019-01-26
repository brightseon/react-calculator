import React, { Component, MouseEventHandler } from 'react';
import HeaderPresenter from './HeaderPresenter';
import { ipcRenderer } from 'electron';

class HeaderContainer extends Component {

    closeWindow : React.MouseEventHandler<HTMLDivElement> = (e) : void => {
        console.log('click');
        e.preventDefault();
        ipcRenderer.send('close-window');
    };

    render() {
        return <HeaderPresenter closeWindow={ this.closeWindow } />;
    };
}

export default HeaderContainer;