import React, { Component } from 'react';
import HistoryPresenter from './HistoryPresenter';
import { CalcHistoryType } from '../../redux/modules/calc/types';

interface IProps {
    calcHistory : CalcHistoryType[];
    allRemoveHistory : () => void;
    removeHistory : () => void;
};

class HistoryContainer extends Component<IProps> {
    shouldComponentUpdate = (nextProps : Readonly<IProps>) : boolean => {
        if(this.props.calcHistory !== nextProps.calcHistory) {
            return true;
        }

        return false;
    };

    render() {
        const { calcHistory, removeHistory, allRemoveHistory } = this.props;

        return <HistoryPresenter calcHistory={ calcHistory } removeHistory={ removeHistory } allRemoveHistory={ allRemoveHistory } />;
    };
};

export default HistoryContainer;