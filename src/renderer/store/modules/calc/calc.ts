import { CLICK_BUTTON, CalcState, ClickAction } from './types';

export const clickButton = (button : number | string) : ClickAction => {
    return {
        type : CLICK_BUTTON,
        payload : button
    };
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : []
};

const reducer = (state : CalcState = initialState, action : ClickAction) : CalcState => {
    switch (action.type) {
        case CLICK_BUTTON :
            return setCurrentExpression(state, action);
        default :
            return initialState;
    }
};

const setCurrentExpression = (state : CalcState, action : ClickAction) : CalcState => {
    return {
        ...state,
        currentExpression : state.currentExpression + action.payload
    };
};

export default reducer;