import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Input,
    Icon,
    Badge,
    Menu,
    Breadcrumb,
    Dropdown,
    Divider,
    notification,
    Spin,
    Tabs,
    message,
    Table,
    Modal
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getLiveListUrl = restUrl.ADDR + 'news/queryList';
const reviewUrl = restUrl.ADDR + 'news/review';
const delLiveUrl = restUrl.ADDR + 'health/delLive';

class NewsList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '动态标题',
            dataIndex: 'newsTitle',
            key: 'newsTitle',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '描述',
            dataIndex: 'newsBrief',
            key: 'newsBrief',
        }, {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
            render: (text, record, index) => {
                if (text === 0) {
                    return (
                        <span><Badge status="warning"/>待审核</span>
                    );
                } else if (text === 1) {
                    return (
                        <span><Badge status="success"/>审核通过</span>
                    );
                } else if (text === -1) {
                    return (
                        <span><Badge status="success"/>不合格</span>
                    );
                }
            }
        }, {
            title: '创建人',
            dataIndex: 'creatorName',
            key: 'creatorName',
            render: (text, record, index) => (
                <span>{text}-{record.typeName}</span>
            )
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (text, record, index) => (
                <div>
                    <a onClick={() => this.onReview(record.id)}>审核</a>
                    <Divider type="vertical"/>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link to={this.editrouter(record.id)}>编辑</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={() => this.onDelete(record.id)}>删除</a>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <a className="ant-dropdown-link">操作</a>
                    </Dropdown>
                </div>
            ),
        }];

        this.state = {
            loading: false,
            dataSource: []
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(getLiveListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => {
                    item.key = item.id;
                });
                this.setState({
                    dataSource: backData,
                    loading: false
                });
            }
        });
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/news/editNews/${id}`
    }

    onReview = id => {
        Modal.confirm({
            title: '提示',
            content: '确认审核通过吗',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = id;
                ajax.postJSON(reviewUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '审核成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        this.getList();
                        this.forceUpdate();
                    } else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    onDelete = (key) => {
        Modal.confirm({
            title: '提示',
            content: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = key;
                ajax.postJSON(delLiveUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        this.getList();
                        this.forceUpdate();
                    } else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        const {loading, dataSource} = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>新闻资讯</Breadcrumb.Item>
                        <Breadcrumb.Item>新闻列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>新闻列表</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Table
                            bordered={true}
                            dataSource={dataSource}
                            columns={this.columns}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}

NewsList.contextTypes = {
    router: React.PropTypes.object
}

export default NewsList;