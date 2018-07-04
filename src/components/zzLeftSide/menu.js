const Menu = [
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
            },{
                key: '1_2',
                link: '/frame/home',
                label: '流量数据统计'
            },{
                key: '1_3',
                link: '/frame/organize',
                label: '组织权限'
            },{
                key: '1_4',
                link: '/frame/ad/platform',
                label: '广告平台'
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
                link: '/frame/cultureShow/regionalFolklore/',
                label: '地域民俗'
            }, {
                key: '2_2',
                link: '/frame/cultureShow/folkloreShow/',
                label: '民俗展馆及活动'
            }, {
                key: '2_3',
                link: '/frame/cultureShow/folkloreGuide/',
                label: '民俗游推荐'
            }, {
                key: '2_4',
                link: '/frame/cultureShow/folkloreGoods/',
                label: '湖北民俗商品'
            }, {
                key: '2_5',
                link: '/frame/need/',
                label: '全站搜索'
            }, {
                key: '2_6',
                link: '/frame/need/',
                label: '地图导读'
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
                }, {
                    key: '3_2',
                    link: '/frame/news/addNews',
                    label: '添加新闻'
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
        			link: '/frame/company/website',
        			label: '图片管理'
        		}, {
        			key: '4_2',
        			link: '/frame/company/webSiteResident',
        			label: '上传图片'
        		}
        	]
        }, {
        	key: '5',
        	iconType: 'credit-card',
        	link: '',
        	label: '在线视频',
        	children: [
        		{
        			key: '5_1',
        			link: '/frame/cultureShow/propertyInformation',
        			label: '房源信息管理'
        		}
        	]
        // }, {
        //    key: '7',
        //    iconType: 'rocket',
        //    link: '',
        //    label: '训练段动态',
        //    children: [
        //        {
        //            key: '7_1',
        //            link: '/frame/news/liveList',
        //            label: '动态列表'
        //        },
        //        {
        //            key: '7_2',
        //            link: '/frame/news/addLive',
        //            label: '新增动态'
        //        }
        //    ]
        // }, {
        // 	key: '6',
        // 	iconType: 'credit-card',
        // 	link: '',
        // 	label: '联系我们',
        // 	children: [
        // 		{
        // 			key: '6_1',
        // 			link: '/frame/organize',
        // 			label: '班车信息管理'
        // 		}
        // 	]
    }
];

export default Menu;