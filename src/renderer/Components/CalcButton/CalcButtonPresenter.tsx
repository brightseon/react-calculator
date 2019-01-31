import React from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels } from '../../utils/buttonLabels';

const CalcButtonPresenter = () => (
    <div className={ styles.calcButtonBox }>
        {
            buttonLabels.map(buttonLabel => <Button key={ `${ buttonLabel.className }_${ buttonLabel.text }` } className={ styles[buttonLabel.className] } onClick={ null } text={ buttonLabel.text } />)
        }
    </div>
);

export default CalcButtonPresenter;