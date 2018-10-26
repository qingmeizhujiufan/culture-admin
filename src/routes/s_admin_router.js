import React from "react";
import {IndexRoute, Route} from "react-router";



module.exports = ([
    <Route key='1' path="home" component={Home} />,
    <Route key='2' path="webSetting" component={WebSetting} />,
    <Route key='3' path="ad/platform" component={Ad} />,
    <Route key='4' path="ad/platform/edit/:id" component={EditAd} />,
    <Route key='5' path="ad/platform/add" component={AddAd} />,
    <Route key='6' path="taste/manage" component={Taste} />,
    <Route key='7' path="comment/commentTaste" component={CommentTaste} />,
    <Route key='8' path="culture/cultureList" component={CultureList} />,
    <Route key='9' path="culture/cultureList/add" component={AddCulture} />,
    <Route key='10' path="culture/cultureList/edit/:id" component={EditCulture} />,
    <Route key='11' path="comment/commentCulture(/:id)" component={CommentCulture} />,
    <Route key='12' path="culture/artList" component={ArtList} />,
    <Route key='13' path="culture/artList/add" component={AddArt} />,
    <Route key='14' path="culture/artList/edit/:id" component={EditArt} />,
    <Route key='15' path="comment/commentArt(/:id)" component={CommentArt} />,
    <Route key='16' path="news/newsList" component={NewsList} />,
    <Route key='17' path="news/newsList/edit/:id" component={EditNews} />,
    <Route key='18' path="news/newsList/add" component={AddNews} />,
    <Route key='19' path="organize" component={Organize} />,
    <Route key='20' path="city" component={City} />,
    <Route key='21' path="video/list" component={Video} />,
    <Route key='22' path="video/list/edit/:id" component={EditVideo} />,
    <Route key='23' path="video/list/add" component={AddVideo} />,
    <Route key='24' path="user/count" component={User} />,
    <Route key='25' path="user/list" component={UserList} />,
]);