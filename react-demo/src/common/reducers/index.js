import {combineReducers}  from 'redux';
import products from './productReducer';
import filters from './filterReducer';
import authData from './userReducer';

 const rootReducer  =  combineReducers({
     products,
     filters,
     authData
 });

 export default rootReducer;