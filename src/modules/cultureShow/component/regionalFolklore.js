import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, message, Button} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getHealthListUrl = restUrl.ADDR + 'health/getHealthList';
const delHealthUrl = restUrl.ADDR + 'health/delHealth';

class HealthLifeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listData: []
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
    }

    delHealth = id => {
        this.setState({
            loading: true
        });
        let param = {};
        param.id = id;
        ajax.postJSON(delHealthUrl, JSON.stringify(param), data => {
            if (data.success) {
                this.setState({
                    loading: false
                }, () => {
                    this.getList();
                });

            } else {

            }
        });
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/dish/editDish/${id}`
    }

    render() {
        const {
            loading,
        } = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>文化展示</Breadcrumb.Item>
                            <Breadcrumb.Item>地域民俗</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>地域民俗列表</h1>
                </div>
                <div className='pageContent'>
                    <div className="ibox-content">
                        <Spin spinning={loading}>
                        </Spin>
                    </div>
                </div>
            </div>
        );
    }
}

HealthLifeList.contextTypes = {
    router: React.PropTypes.object
}

export default HealthLifeList;