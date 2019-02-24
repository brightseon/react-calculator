const CLICK_BUTTON = 'CLICK_BUTTON';

export const clickButton = (button : string | string) => {
    return {
        type : CLICK_BUTTON,
        currentExpression : button
    };
};

export interface CalcState {
    currentExpression : string;
    calcHistory : object[];
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : []
};

interface ClickAction {
    type : typeof CLICK_BUTTON,
    payload : number | string;
};

const reducer = (state : CalcState = initialState, action : ClickAction) => {
    switch (action.type) {
        case CLICK_BUTTON :
            setCurrentExpression(state, action);
        default :
            return initialState;
    }
};

const setCurrentExpression = (state : CalcState, action : ClickAction) => {
    return {
        ...state,
        currentExpression : state.currentExpression + action.payload
    };
};

export default reducer;