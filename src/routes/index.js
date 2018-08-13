import React from 'react';
import {Route, IndexRoute} from 'react-router';
import s_admin_router from './s_admin_router';
import admin_router from './admin_router';

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 登录 */
import Login from '../modules/login/component/login';
import Home from "../modules/home/component/home";

const requireAuth = (nextState, replace) => {
    if (!sessionStorage.expireDate || new Date(sessionStorage.expireDate).getTime() <= new Date().getTime()) {
        replace({pathname: '/'})
    }
}

let pageRouter = [];

if(sessionStorage.type && sessionStorage.type === "1"){
    pageRouter = [
        <IndexRoute key='0' component={Home}/>,
        ...s_admin_router
    ];
}
if(sessionStorage.type && sessionStorage.type === "2"){
    pageRouter = [
        <IndexRoute key='0' component={Home}/>,
        ...admin_router
    ];
}
if(sessionStorage.type && sessionStorage.type === "3"){
    pageRouter = [
        <IndexRoute key='0' component={Home}/>,
        ...s_admin_router
    ];
}

console.log('pageRouter == ', pageRouter);
module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <route path="login" component={Login}/>
        <Route path="/frame(/*)" component={Frame} onEnter={requireAuth}>
            {pageRouter}
        </Route>
    </Route>
);
