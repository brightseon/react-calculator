import React, { SFC } from 'react';

interface IProps {
    isSetting : boolean
};

const Menu : SFC<IProps> = ({ isSetting }) => (
    <div>
        {
            isSetting ? <span>Setting</span> : <span>History</span>
        }
    </div>
);

export default Menu;