import React from 'react';
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
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

class PageRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount = () => {
        // this.setPageRouter();
        // window.addEventListener('storage', this.setPageRouter);
    }

    componentDidMount = () => {
        // window.addEventListener('setItemEvent', this.setPageRouter);
    }

    // componentWillUnmount = () => {
    //     window.removeEventListener('storage', this.setPageRouter, false);
    // }

    setPageRouter = () => {
        let pageRouter = [];
        if (sessionStorage.type !== undefined && sessionStorage.type !== null) {
            if (sessionStorage.type === "1") {
                pageRouter = [...s_admin_router];
            }
            else if (sessionStorage.type === "2") {
                pageRouter = [...admin_router];
            }
            else if (sessionStorage.type === "3") {
                pageRouter = [...s_admin_router];
            }
            this.setState({
                routes: (
                    <Router history={hashHistory}>
                        <Route path="/" component={App}>
                            <IndexRoute component={Login}/>
                            <Route path="login" component={Login}/>
                            <Route path="/frame(/*)" component={Frame} onEnter={requireAuth}>
                                <IndexRoute component={Home}/>
                                {pageRouter}
                            </Route>
                        </Route>
                    </Router>
                )
            });
        } else {

        }
        console.log('pageRouter == ', pageRouter);
    }

    render() {
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Login}/>
                        <Route path="login" component={Login}/>
                        <Route path="/frame(/*)" component={Frame} onEnter={requireAuth}>
                            <IndexRoute component={Home}/>
                            {s_admin_router}
                        </Route>
                    </Route>
                </Router>
            </div>
        )
    }
}

export default PageRouter;
