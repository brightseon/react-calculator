import { createStore, combineReducers } from 'redux';
import calc from './modules/calc/calc';

const reducer = combineReducers({
    calc
});

const store = createStore(reducer);

export default store;