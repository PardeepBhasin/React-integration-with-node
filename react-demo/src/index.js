import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './common/store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadProducts, loadFilters} from './common/actions/productActions';
import './modules/components/buy/views/style/buy.css';

const store = configureStore();
//store.dispatch(loadProducts());
//store.dispatch(loadFilters());

render(
    <Provider store={store} >
        <Router history={browserHistory} routes={routes} />
    </Provider>, 
    document.getElementById('main')
);