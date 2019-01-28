import React, { Fragment } from 'react';
import styles from './styles.scss';
import Header from '../Header';
import Home from '../Home';

const AppPresenter : React.SFC = () => (
    <div>
        <Header />
        <Home />
    </div>
);

export default AppPresenter;