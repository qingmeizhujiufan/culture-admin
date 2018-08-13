const Menu_S_Admin = [
    {
        key: '1',
        iconType: 'dashboard',
        label: '平台概况',
        children: [
            {
                key: '1_1',
                link: '/frame/home',
                label: '首页'
            }, {
                key: '1_2',
                link: '/frame/organize',
                label: '组织权限'
            }, {
                key: '1_3',
                link: '/frame/ad/platform',
                label: '广告平台'
            }, {
                key: '1_4',
                link: '/frame/city',
                label: '城市管理'
            }, {
                key: '1_5',
                link: '/frame/webSetting',
                label: '网站设置'
            }
        ]
    }, {
        key: '2',
        iconType: 'solution',
        label: '文化展示',
        children: [
            {
                key: '2_1',
                link: '/frame/culture/cultureList',
                label: '文化列表'
            }, {
                key: '2_2',
                link: '/frame/comment/commentCulture',
                label: '文化评论管理'
            }, {
                key: '2_3',
                link: '/frame/culture/artList',
                label: '艺术品列表'
            }, {
                key: '2_4',
                link: '/frame/comment/commentArt',
                label: '艺术品评论管理'
            }
        ]
    }, {
        key: '3',
        iconType: 'table',
        label: '新闻资讯',
        children: [
            {
                key: '3_1',
                link: '/frame/news/newsList',
                label: '新闻列表'
            }
        ]
    }, {
        key: '4',
        iconType: 'line-chart',
        label: '图片展示',
        children: [
            {
                key: '4_1',
                link: '/frame/taste/manage',
                label: '图片管理'
            }, {
                key: '4_2',
                link: '/frame/comment/commentTaste',
                label: '图片评论管理'
            }
        ]
    }, {
        key: '5',
        iconType: 'credit-card',
        label: '在线视频',
        children: [
            {
                key: '5_1',
                link: '/frame/video/list',
                label: '在线视频列表'
            }, {
                key: '5_2',
                link: '/frame/video/list/add',
                label: '新增视频'
            },
        ]
    }, {
        key: '6',
        iconType: 'rocket',
        label: '用户管理',
        children: [
            {
                key: '6_1',
                link: '/frame/user/count',
                label: '统计分析'
            },
            {
                key: '6_2',
                link: '/frame/user/list',
                label: '用户列表'
            }
        ]
    }
];

const Menu_Admin = [
    {
        key: '1',
        iconType: 'dashboard',
        link: '/frame/home',
        label: '平台概况',
        children: [
            {
                key: '1_1',
                link: '/frame/home',
                label: '首页'
            }, {
                key: '1_2',
                link: '/frame/organize',
                label: '组织权限'
            }, {
                key: '1_5',
                link: '/frame/webSetting',
                label: '网站设置'
            }
        ]
    }, {
        key: '2',
        iconType: 'solution',
        link: '',
        label: '文化展示',
        children: [
            {
                key: '2_1',
                link: '/frame/culture/cultureList',
                label: '文化列表'
            }, {
                key: '2_2',
                link: '/frame/comment/commentCulture',
                label: '文化评论管理'
            }, {
                key: '2_3',
                link: '/frame/culture/artList',
                label: '艺术品列表'
            }, {
                key: '2_4',
                link: '/frame/comment/commentArt',
                label: '艺术品评论管理'
            }
        ]
    }, {
        key: '3',
        iconType: 'table',
        link: '',
        label: '新闻资讯',
        children: [
            {
                key: '3_1',
                link: '/frame/news/newsList',
                label: '新闻列表'
            }
        ]
    }, {
        key: '4',
        iconType: 'line-chart',
        link: '',
        label: '图片展示',
        children: [
            {
                key: '4_1',
                link: '/frame/taste/manage',
                label: '图片管理'
            }, {
                key: '4_2',
                link: '/frame/comment/commentTaste',
                label: '图片评论管理'
            }
        ]
    }
];

let Menu = [];
if (sessionStorage.type && sessionStorage.type === "1") {
    Menu = Menu_S_Admin;
}
else if (sessionStorage.type && sessionStorage.type === "2") {
    Menu = Menu_Admin;
}
else if (sessionStorage.type && sessionStorage.type === "3") {
    Menu = Menu_Admin;
}

export default Menu;