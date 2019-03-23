import { createStore, combineReducers } from 'redux';
import calc from './modules/calc';
import sidebar from './modules/sidebar';

const reducer = combineReducers({
    calc,
    sidebar
});

const store = createStore(reducer);

export default store;