import { MAKE_EXPRESSION, CalcState, MakeExpressionAction } from './types';

export const makeExpression = (button : number | string) : MakeExpressionAction => {
    return {
        type : MAKE_EXPRESSION,
        payload : button
    };
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : []
};

const reducer = (state : CalcState = initialState, action : MakeExpressionAction) : CalcState => {
    switch (action.type) {
        case MAKE_EXPRESSION :
            return setCurrentExpression(state, action);
        default :
            return initialState;
    }
};

const setCurrentExpression = (state : CalcState, action : MakeExpressionAction) : CalcState => {
    return {
        ...state,
        currentExpression : state.currentExpression + action.payload
    };
};

export default reducer;