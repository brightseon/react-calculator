import React, { Fragment } from 'react';
import styles from './styles.scss';
import Header from '../Header';

const AppPresenter : React.SFC = () => (
    <div>
        <Header />
        <span className={ styles.font }>Hello Electron, Typescript, React</span>
    </div>
);

export default AppPresenter;