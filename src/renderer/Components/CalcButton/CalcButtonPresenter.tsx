import React, { SFC } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import { buttonLabels, LabelInfo } from '../../utils/buttonLabels';

interface IProps {
    clickButton : (buttonLabel : LabelInfo) => void;
};


const CalcButtonPresenter : SFC<IProps> = ({ clickButton }) => (
        <div className={ styles.calcButtonBox }>
            {
                buttonLabels.map(
                    buttonLabel => (
                        <Button key={ `${ buttonLabel.labelType }_${ buttonLabel.text }` } className={ styles[buttonLabel.labelType] } 
                                onClick={ () => clickButton(buttonLabel) }
                                text={ buttonLabel.text } />
                    )
                )
            }
        </div>
);

export default CalcButtonPresenter;