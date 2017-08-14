import React from 'react';
import {Route, IndexRoute}  from 'react-router';
import app from './app';
import HomePage from './modules/components/buy/views/home/ProductDetailPage';
import notFound from './common/app.notFound';
import LoginPage from './modules/authorization/login';
import AuthUserDetailsComponent from './modules/authorization/AuthUserDetails';

export default (
    <Route path="/" component={app}>
        <IndexRoute component={notFound}/>
        <Route path="login" component={LoginPage}/>
        <Route path="devices" component={HomePage}/>
        <Route path="usersDetail" component={AuthUserDetailsComponent}/>
    </Route>
);