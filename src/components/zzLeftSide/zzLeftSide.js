import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Layout, Icon, Menu} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';
import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import menuTree from './menu';
import './zzLeftSide.less';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class ZZLeftSide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultSelectedKeys: '1'
        };
    }

    componentWillMount = () => {
        console.log('menuTree === ', menuTree);
        this.selectActiveTab();
    }

    componentDidMount = () => {
    }

    componentWillReceiveProps = nextProps => {
        if('storageChange' in nextProps && nextProps.storageChange !== this.props.storageChange){
            this.selectActiveTab();
        }
    }

    selectActiveTab = () => {
        const router = this.context.router;
        const location = router.location;
        const params = router.params;
        const menu = this.getFlatMenu(menuTree);
        console.log('hashUrl ==== ', location.pathname);
        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];

            if (window.location.hash.split('#')[1].indexOf(item.link) > -1) {
                console.log('active item ==== ', item);
                this.setState({defaultSelectedKeys: item.key});
                return;
            }
        }
    }

    getFlatMenu = menu => {
        return menu.reduce((keys, item) => {
            keys.push(item);
            if (item.children) {
                return keys.concat(this.getFlatMenu(item.children));
            }
            return keys;
        }, []);
    }

    buildMenu = () => {
        return menuTree.map(function (item, index) {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.key}
                        title={<span><Icon type={item.iconType}/><span>{item.label}</span></span>}
                    >
                        {
                            item.children.map(function (subItem, subIndex) {
                                return (
                                    <Menu.Item key={subItem.key}>
                                        <Link to={subItem.link}>{subItem.label}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.link}>
                            <Icon type={item.iconType}/>
                            <span>{item.label}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        });
    }

    render() {
        const {defaultSelectedKeys} = this.state;
        const {collapsed} = this.props;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={256}
                className="left-side"
            >
                <div className="logo">
                    <Link to="/">
                        <h1>ADMIN</h1>
                    </Link>
                </div>
                <Scrollbars style={{height: 'calc(100vh - 64px)'}}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[defaultSelectedKeys]}
                        defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
                    >
                        {this.buildMenu()}
                    </Menu>
                </Scrollbars>
            </Sider>
        );
    }
}

ZZLeftSide.contextTypes = {
    router: PropTypes.object
}

export default ZZLeftSide;
