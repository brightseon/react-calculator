import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels } from '../../utils/buttonLabels';
import { ButtonType } from '../../store/modules/calc/types';

interface IProps {
    clickButton : (button : number | string) => void;
};

const CalcButtonPresenter : SFC<IProps> = ({ clickButton }) => (
    <div className={ styles.calcButtonBox }>
        {
            buttonLabels.map(buttonLabel => <Button key={ `${ buttonLabel.className }_${ buttonLabel.text }` } className={ styles[buttonLabel.className] } onClick={ () => clickButton(buttonLabel.text) } text={ buttonLabel.text } />)
        }
    </div>
);

export default CalcButtonPresenter;