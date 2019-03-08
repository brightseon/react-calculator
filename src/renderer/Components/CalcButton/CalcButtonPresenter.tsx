import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels, CLEAR_BTN } from '../../utils/buttonLabels';

interface IProps {
    makeExpression : (button : number | string) => void;
    resetExpression : () => void;
};

const CalcButtonPresenter : SFC<IProps> = ({ makeExpression, resetExpression }) => (
    <div className={ styles.calcButtonBox }>
        {
            buttonLabels.map(
                buttonLabel => 
                    <Button key={ `${ buttonLabel.labelType }_${ buttonLabel.text }` } className={ styles[buttonLabel.labelType] } onClick={ buttonLabel.labelType === CLEAR_BTN ? resetExpression : () => makeExpression(buttonLabel.text) } text={ buttonLabel.text } />
            )
        }
    </div>
);



export default CalcButtonPresenter;