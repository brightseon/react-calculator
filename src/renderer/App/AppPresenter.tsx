import React, { Fragment } from 'react';
import styles from './styles.scss';
import Header from '../Header';
import Home from '../Home';

const AppPresenter : React.SFC = () => (
    <div className={ styles.appBox }>
        <Header />
        <Home />
    </div>
);

export default AppPresenter;