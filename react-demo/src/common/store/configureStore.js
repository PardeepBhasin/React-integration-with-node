import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
//import reduxImmytableStateInvarient from 'redux-immytable-state-invarient';
import thunk from 'redux-thunk';

export default function configureStore (initialeState) {
    return createStore(
        rootReducer,
        initialeState,
        applyMiddleware(thunk)
    );
}