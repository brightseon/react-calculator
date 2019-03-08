import { MAKE_EXPRESSION, CalcState, MakeExpressionAction, RESET_EXPRESSION, ResetExpressionAction } from './types';

export const makeExpression = (button : number | string) : MakeExpressionAction => {
    return {
        type : MAKE_EXPRESSION,
        payload : button
    };
};

export const resetExpression = () : ResetExpressionAction => {
    return {
        type : RESET_EXPRESSION
    };
};

const initialState : CalcState = {
    currentExpression : '',
    calcHistory : []
};

const reducer = (state : CalcState = initialState, action : MakeExpressionAction | ResetExpressionAction) : CalcState => {
    switch (action.type) {
        case MAKE_EXPRESSION :
            return setCurrentExpression(state, action);

        case RESET_EXPRESSION : 
            return resetCurrentExpression(state, action);
        
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

const resetCurrentExpression = (state : CalcState, action : ResetExpressionAction) : CalcState => {
    return {
        ...state,
        currentExpression : ''
    };
};

export default reducer;