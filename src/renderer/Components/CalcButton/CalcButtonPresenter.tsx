import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels } from '../../utils/buttonLabels';

interface IProps {
    makeExpression : (button : number | string) => void;
};

const CalcButtonPresenter : SFC<IProps> = ({ makeExpression }) => (
    <div className={ styles.calcButtonBox }>
        {
            buttonLabels.map(
                buttonLabel => <Button key={ `${ buttonLabel.className }_${ buttonLabel.text }` } className={ styles[buttonLabel.className] } onClick={ () => makeExpression(buttonLabel.text) } text={ buttonLabel.text } />
            )
        }
    </div>
);

export default CalcButtonPresenter;