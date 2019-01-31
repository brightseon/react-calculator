import React from 'react';
import styles from './styles.scss';
import CalcResult from '../CalcResult';
import CalcButton from '../CalcButton';

const HomePresenter = () => (
    <div className={ styles.homeBox }>
        <CalcResult />
        <CalcButton />
    </div>
);

export default HomePresenter;