import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
/* 登录 */
import Login from '../modules/login/component/login';
/* 广告模块 */
import Ad from '../modules/ad/component/';
import EditAd from '../modules/ad/component/editAd';
import AddAd from '../modules/ad/component/addAd';
/* 公司信息管理 */
import Taste from '../modules/taste/component';
import Website2 from '../modules/taste/component/website2';
import AddServiceAndHoliday from '../modules/taste/component/addServiceAndHoliday';
import EditServiceAndHoliday from '../modules/taste/component/editServiceAndHoliday';
import OrderDetailInfo from '../modules/taste/component/orderDetailInfo';
/* 文化展示管理 */
import CultureList from '../modules/culture/component/cultureList';
import AddCulture from '../modules/culture/component/addCulture';
import EditCulture from '../modules/culture/component/editCulture';
import ArtList from '../modules/culture/component/artList';
import AddArt from '../modules/culture/component/addArt';
import EditArt from '../modules/culture/component/editArt';
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
            <route path="ad/platform" component={Ad} />
            <route path="ad/platform/edit/:id" component={EditAd} />
            <route path="ad/platform/add" component={AddAd} />
            <route path="taste/manage" component={Taste} />
            <route path="company/webSiteResident" component={Website2} />
            <route path="company/addServiceAndHoliday" component={AddServiceAndHoliday} />
            <route path="company/editServiceAndHoliday/:id" component={EditServiceAndHoliday} />
            <route path="company/orderDetailInfo/:id" component={OrderDetailInfo} />
            <route path="culture/cultureList" component={CultureList} />
            <route path="culture/addCulture" component={AddCulture} />
            <route path="culture/cultureList/edit/:id" component={EditCulture} />
            <route path="culture/artList" component={ArtList} />
            <route path="culture/addArt" component={AddArt} />
            <route path="culture/artList/edit/:id" component={EditArt} />
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
