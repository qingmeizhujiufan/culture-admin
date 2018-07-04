import React from 'react';
import {Route, IndexRoute} from 'react-router';

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
/* 菜单管理 */
import DishList from '../modules/dish/component/dishList';
import DishDetailInfo from '../modules/dish/component/dishDetailInfo';
import EditDish from '../modules/dish/component/editDish';
import AddDish from '../modules/dish/component/addDish';
import HealthFood from '../modules/dish/component/healthFood';
import AddHealthFood from '../modules/dish/component/addHealthFood';
import EditHealth from '../modules/dish/component/editHealth';
import DishSurvey from '../modules/dish/component/survey';
import BrandAdmin from '../modules/dish/component/brandAdmin';
/* 公司信息管理 */
import Website from '../modules/company/component/website';
import Website2 from '../modules/company/component/website2';
import AddServiceAndHoliday from '../modules/company/component/addServiceAndHoliday';
import EditServiceAndHoliday from '../modules/company/component/editServiceAndHoliday';
import OrderDetailInfo from '../modules/company/component/orderDetailInfo';
/* 文化展示管理 */
import RegionalFolklore from '../modules/cultureShow/component/regionalFolklore';
import FolkloreShow from '../modules/cultureShow/component/folkloreShow';
import FolkloreGuide from '../modules/cultureShow/component/folkloreGuide';
import FolkloreGoods from '../modules/cultureShow/component/folkloreGoods';
import AddHealthLife from '../modules/cultureShow/component/addHealthLife';
import EditResidenceHealth from '../modules/cultureShow/component/editHealth';
import AddBall from '../modules/cultureShow/component/addBall';
import EditBall from '../modules/cultureShow/component/editBall';
/* 新闻模块 */
import NewsList from '../modules/news/component/newsList';
import AddNews from '../modules/news/component/addNews';
import EditNews from '../modules/news/component/editNews';
/* 班车信息 */
import Organize from '../modules/organize/component/';

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
            <route path="dish/dishList" component={DishList} />
            <route path="dish/dishDetailInfo/:id" component={DishDetailInfo} />
            <route path="dish/editDish/:id" component={EditDish} />
            <route path="dish/AddDish" component={AddDish} />
            <route path="dish/healthFood" component={HealthFood} />
            <route path="dish/addHealthFood" component={AddHealthFood} />
            <route path="dish/editHealth/:id" component={EditHealth} />
            <route path="dish/survey" component={DishSurvey} />
            <route path="dish/brandAdmin" component={BrandAdmin} />
            <route path="company/website" component={Website} />
            <route path="company/webSiteResident" component={Website2} />
            <route path="company/addServiceAndHoliday" component={AddServiceAndHoliday} />
            <route path="company/editServiceAndHoliday/:id" component={EditServiceAndHoliday} />
            <route path="company/orderDetailInfo/:id" component={OrderDetailInfo} />
            <route path="cultureShow/regionalFolklore" component={RegionalFolklore} />
            <route path="cultureShow/folkloreShow" component={FolkloreShow} />
            <route path="cultureShow/folkloreGuide" component={FolkloreGuide} />
            <route path="cultureShow/folkloreGoods" component={FolkloreGoods} />
            <route path="cultureShow/addHealthLife" component={AddHealthLife} />
            <route path="cultureShow/editHealth/:id" component={EditResidenceHealth} />
            <route path="cultureShow/addBall" component={AddBall} />
            <route path="cultureShow/editBall/:id" component={EditBall} />
            <route path="news/newsList" component={NewsList} />
            <route path="news/newsList/edit/:id" component={EditNews} />
            <route path="news/addNews" component={AddNews} />
            <route path="organize" component={Organize} />
        </Route>
    </Route>
);
