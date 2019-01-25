import React from 'react';
import styles from './styles.scss';
import menu from '../../../images/menu.svg';
import maximize from '../../../images/maximize.svg';
import minimization from '../../../images/minimization.svg';
import close from '../../../images/close.svg';

console.log(styles);

const HeaderPresenter = () => (
    <div className={ styles.header }>
        <div>
            <img src={ menu } />
        </div>
        <div className={ styles.box }>
            <div>
                <img src={ minimization } />
            </div>
            <div className={ styles.maxBtn }>
                <img src={ maximize } />
            </div>
            <div>
                <img src={ close } />
            </div>
        </div>
    </div>
);

export default HeaderPresenter;