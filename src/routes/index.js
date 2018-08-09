import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
import WebSetting from '../modules/home/component/webSetting';
/* 登录 */
import Login from '../modules/login/component/login';
/* 广告模块 */
import Ad from '../modules/ad/component/';
import EditAd from '../modules/ad/component/editAd';
import AddAd from '../modules/ad/component/addAd';
/* 公司信息管理 */
import Taste from '../modules/taste/component';
import CommentTaste from '../modules/taste/component/commentTaste';
/* 文化展示管理 */
import CultureList from '../modules/culture/component/cultureList';
import AddCulture from '../modules/culture/component/addCulture';
import EditCulture from '../modules/culture/component/editCulture';
import CommentCulture from '../modules/culture/component/commentCulture';
import ArtList from '../modules/culture/component/artList';
import AddArt from '../modules/culture/component/addArt';
import EditArt from '../modules/culture/component/editArt';
import CommentArt from '../modules/culture/component/commentArt';
/* 新闻模块 */
import NewsList from '../modules/news/component/newsList';
import AddNews from '../modules/news/component/addNews';
import EditNews from '../modules/news/component/editNews';
/* 组织管理 */
import Organize from '../modules/organize/component/';
/* 城市管理 */
import City from '../modules/city/component/';
/* 在线视频模块 */
import Video from '../modules/video/component/';
import EditVideo from '../modules/video/component/edit';
import AddVideo from '../modules/video/component/add';
/* 用户管理 */
import User from '../modules/user/component/';
import UserList from '../modules/user/component/userList';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <route path="login" component={Login} />
        <Route path="/frame" component={Frame}>
            <IndexRoute component={Home}/>
            <route path="home" component={Home} />
            <route path="webSetting" component={WebSetting} />
            <route path="ad/platform" component={Ad} />
            <route path="ad/platform/edit/:id" component={EditAd} />
            <route path="ad/platform/add" component={AddAd} />
            <route path="taste/manage" component={Taste} />
            <route path="comment/commentTaste" component={CommentTaste} />
            <route path="culture/cultureList" component={CultureList} />
            <route path="culture/addCulture" component={AddCulture} />
            <route path="culture/cultureList/edit/:id" component={EditCulture} />
            <route path="comment/commentCulture(/:id)" component={CommentCulture} />
            <route path="culture/artList" component={ArtList} />
            <route path="culture/addArt" component={AddArt} />
            <route path="culture/artList/edit/:id" component={EditArt} />
            <route path="comment/commentArt" component={CommentArt} />
            <route path="news/newsList" component={NewsList} />
            <route path="news/newsList/edit/:id" component={EditNews} />
            <route path="news/addNews" component={AddNews} />
            <route path="organize" component={Organize} />
            <route path="city" component={City} />
            <route path="video/list" component={Video} />
            <route path="video/list/edit/:id" component={EditVideo} />
            <route path="video/list/add" component={AddVideo} />
            <route path="user/count" component={User} />
            <route path="user/list" component={UserList} />
        </Route>
    </Route>
);
