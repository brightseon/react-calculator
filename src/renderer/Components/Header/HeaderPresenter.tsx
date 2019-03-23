import React from 'react';
import styles from './styles.scss';
import menu from '../../../../images/menu.svg';
import maximize from '../../../../images/maximize.svg';
import minimization from '../../../../images/minimization.svg';
import close from '../../../../images/close.svg';

interface IProps {
    closeWindow : (e : React.MouseEvent<HTMLDivElement>) => void;
    maximizeWindow : (e : React.MouseEvent<HTMLDivElement>) => void;
    minimizeWindow : (e : React.MouseEvent<HTMLDivElement>) => void;
    openSidebar : (isSetting : boolean) => void;
};

const HeaderPresenter : React.SFC<IProps> = ({ closeWindow, maximizeWindow, minimizeWindow, openSidebar }) => (
    <div className={ styles.header }>
        <div className={ styles.menuBtn } onClick={ () => openSidebar(true) }>
            <img src={ menu } />
        </div>
        <div className={ styles.box }>
            <div className={ styles.minBtn } onClick={ minimizeWindow }>
                <img src={ minimization } />
            </div>
            <div className={ styles.maxBtn } onClick={ maximizeWindow }>
                <img src={ maximize } />
            </div>
            <div className={ styles.closeBtn } onClick={ closeWindow }>
                <img src={ close } />
            </div>
        </div>
    </div>
);

export default HeaderPresenter;