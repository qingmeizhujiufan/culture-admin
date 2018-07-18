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
            },{
                key: '1_5',
                link: '/frame/city',
                label: '城市管理'
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
                link: '/frame/culture/list',
                label: '文化列表'
            }, {
                key: '2_2',
                link: '/frame/culture/add',
                label: '新增文化'
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
        			link: '/frame/taste/manage',
        			label: '图片管理'
        		}, {
        			key: '4_2',
        			link: '/frame/taste/webSiteResident',
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
        			link: '/frame/culture/propertyInformation',
        			label: '房源信息管理'
        		}
        	]
        }, {
           key: '6',
           iconType: 'rocket',
           link: '',
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