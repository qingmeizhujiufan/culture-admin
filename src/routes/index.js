import React from 'react';
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import {Icon} from 'antd';
import Loadable from 'react-loadable';

function Loading(props) {
    if (props.error) {
        return <div>错误! <button onClick={props.retry}>点击重试</button></div>;
    } else if (props.timedOut) {
        return <div>已经超时加载... <button onClick={props.retry}>点击重试</button></div>;
    } else if (props.pastDelay) {
        return (
            <div style={{
                padding: '30px 0',
                textAlign: 'center'
            }}>
                <Icon type="loading" style={{fontSize: 24}}/>
            </div>
        );
    } else {
        return null;
    }
}

const App = Loadable({
    loader: () => import('../modules/App'),
    loading: Loading
});
const Frame = Loadable({
    loader: () => import('../modules/Frame'),
    loading: Loading
});

/* 登录 */
const Login = Loadable({
    loader: () => import('../modules/login/component/login'),
    loading: Loading
});

/* 首页 */
const Home = Loadable({
    loader: () => import('../modules/home/component/home'),
    loading: Loading
});
const WebSetting = Loadable({
    loader: () => import('../modules/home/component/webSetting'),
    loading: Loading
});

/* 广告模块 */
const Ad = Loadable({
    loader: () => import('../modules/ad/component/'),
    loading: Loading
});
const EditAd = Loadable({
    loader: () => import('../modules/ad/component/editAd'),
    loading: Loading
});
const AddAd = Loadable({
    loader: () => import('../modules/ad/component/addAd'),
    loading: Loading
});
/* 公司信息管理 */
const Taste = Loadable({
    loader: () => import('../modules/taste/component'),
    loading: Loading
});
const CommentTaste = Loadable({
    loader: () => import('../modules/taste/component/commentTaste'),
    loading: Loading
});
/* 文化展示管理 */
const CultureList = Loadable({
    loader: () => import('../modules/culture/component/cultureList'),
    loading: Loading
});
const AddCulture = Loadable({
    loader: () => import('../modules/culture/component/addCulture'),
    loading: Loading
});
const EditCulture = Loadable({
    loader: () => import('../modules/culture/component/editCulture'),
    loading: Loading
});
const CommentCulture = Loadable({
    loader: () => import('../modules/culture/component/commentCulture'),
    loading: Loading
});
const ArtList = Loadable({
    loader: () => import('../modules/culture/component/artList'),
    loading: Loading
});
const AddArt = Loadable({
    loader: () => import('../modules/culture/component/addArt'),
    loading: Loading
});
const EditArt = Loadable({
    loader: () => import('../modules/culture/component/editArt'),
    loading: Loading
});
const CommentArt = Loadable({
    loader: () => import('../modules/culture/component/commentArt'),
    loading: Loading
});
/* 新闻模块 */
const NewsList = Loadable({
    loader: () => import('../modules/news/component/newsList'),
    loading: Loading
});
const AddNews = Loadable({
    loader: () => import('../modules/news/component/addNews'),
    loading: Loading
});
const EditNews = Loadable({
    loader: () => import('../modules/news/component/editNews'),
    loading: Loading
});
/* 组织管理 */
const Organize = Loadable({
    loader: () => import('../modules/organize/component/'),
    loading: Loading
});
/* 城市管理 */
const City = Loadable({
    loader: () => import('../modules/city/component/'),
    loading: Loading
});
/* 在线视频模块 */
const Video = Loadable({
    loader: () => import('../modules/video/component/'),
    loading: Loading
});
const EditVideo = Loadable({
    loader: () => import('../modules/video/component/edit'),
    loading: Loading
});
const AddVideo = Loadable({
    loader: () => import('../modules/video/component/add'),
    loading: Loading
});
/* 用户管理 */
const User = Loadable({
    loader: () => import('../modules/user/component/'),
    loading: Loading
});
const UserList = Loadable({
    loader: () => import('../modules/user/component/userList'),
    loading: Loading
});

const requireAuth = (nextState, replace) => {
    if (!sessionStorage.expireDate || new Date(sessionStorage.expireDate).getTime() <= new Date().getTime()) {
        replace({pathname: '/'})
    }
}

class PageRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
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
                            <Route path="home" component={Home}/>
                            <Route path="webSetting" component={WebSetting}/>
                            <Route path="ad/platform" component={Ad}/>
                            <Route path="ad/platform/edit/:id" component={EditAd}/>
                            <Route path="ad/platform/add" component={AddAd}/>
                            <Route path="taste/manage" component={Taste}/>
                            <Route path="comment/commentTaste" component={CommentTaste}/>
                            <Route path="culture/cultureList" component={CultureList}/>
                            <Route path="culture/cultureList/add" component={AddCulture}/>
                            <Route path="culture/cultureList/edit/:id" component={EditCulture}/>
                            <Route path="comment/commentCulture(/:id)" component={CommentCulture}/>
                            <Route path="culture/artList" component={ArtList}/>
                            <Route path="culture/artList/add" component={AddArt}/>
                            <Route path="culture/artList/edit/:id" component={EditArt}/>
                            <Route path="comment/commentArt(/:id)" component={CommentArt}/>
                            <Route path="news/newsList" component={NewsList}/>
                            <Route path="news/newsList/edit/:id" component={EditNews}/>
                            <Route path="news/newsList/add" component={AddNews}/>
                            <Route path="organize" component={Organize}/>
                            <Route path="city" component={City}/>
                            <Route path="video/list" component={Video}/>
                            <Route path="video/list/edit/:id" component={EditVideo}/>
                            <Route path="video/list/add" component={AddVideo}/>
                            <Route path="user/count" component={User}/>
                            <Route path="user/list" component={UserList}/>
                        </Route>
                    </Route>
                </Router>
            </div>
        )
    }
}

export default PageRouter;
