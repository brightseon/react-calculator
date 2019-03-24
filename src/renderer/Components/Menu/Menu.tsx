import React, { SFC } from 'react';
import History from '../History';
import styles from './styles.scss';

interface IProps {
    isSetting : boolean
};

const Menu : SFC<IProps> = ({ isSetting }) => (
    <div className={ styles.menu }>
        {
            isSetting ? <span>Setting</span> : <History />
        }
    </div>
);

export default Menu;