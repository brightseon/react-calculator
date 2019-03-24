import React, { SFC } from 'react';
import History from '../History';

interface IProps {
    isSetting : boolean
};

const Menu : SFC<IProps> = ({ isSetting }) => (
    <div>
        {
            isSetting ? <span>Setting</span> : <History />
        }
    </div>
);

export default Menu;