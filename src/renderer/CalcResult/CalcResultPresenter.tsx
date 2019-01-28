import React from 'react';
import styles from './styles.scss';
import Button from '../Button';

const CalcResultPresenter = () => (
    <div className={ styles.caclResultBox }>
        <input className={ styles.caclResultInput } type="text" name="calcResult" />
        <div className={ styles.btnBox }>
            <Button className={ styles.commonBtn } text={ 'HISTORY' } onClick={ null } />
            <Button className={ styles.commonBtn } text={ 'COPY' } onClick={ null } />
        </div>
    </div>
);

export default CalcResultPresenter;