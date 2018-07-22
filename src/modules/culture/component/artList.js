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
    Card,
    message,
    Table,
    Modal,
    Switch
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const queryListUrl = restUrl.ADDR + 'art/queryListByAdmin';
const reviewUrl = restUrl.ADDR + 'art/review';
const delLiveUrl = restUrl.ADDR + 'art/delete';
const settingRecommendUrl = restUrl.ADDR + 'art/settingRecommend';

class ArtList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '艺术品名称',
            width: 450,
            dataIndex: 'artTitle',
            key: 'artTitle',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '描述',
            dataIndex: 'artBrief',
            key: 'artBrief',
        }, {
            title: '新闻城市',
            width: 120,
            align: 'center',
            dataIndex: 'cityName',
            key: 'cityName',
        }, {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
            width: 120,
            style: {textAlign: 'left'},
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
                        <span><Badge status="error"/>不合格</span>
                    );
                }
            }
        }, {
            title: '是否推荐',
            width: 120,
            align: 'center',
            dataIndex: 'isRecommend',
            key: 'isRecommend',
            render: (text, record, index) => (
                <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={text === 1 ? true : false}
                    onChange={checked => this.onRecommendChange(checked, record, index)}
                />
            )
        }, {
            title: '创建人',
            width: 120,
            align: 'center',
            dataIndex: 'creatorName',
            key: 'creatorName',
            render: (text, record, index) => (
                <span>{text}-{record.typeName}</span>
            )
        }, {
            title: '创建时间',
            width: 120,
            align: 'center',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (text, record, index) => (
                <div>
                    <a onClick={() => this.onReview(record.id, index)}>审核</a>
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
        ajax.getJSON(queryListUrl, param, data => {
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

    onRecommendChange = (checked, record, index) => {
        const param = {};
        param.id = record.id;
        param.isRecommend = checked ? 1 : 0;
        ajax.postJSON(settingRecommendUrl, JSON.stringify(param), data => {
            if (data.success) {
                notification.open({
                    message: '推荐设置成功！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
                const dataSource = [...this.state.dataSource];
                dataSource[index].isRecommend = checked ? 1 : 0;

                this.setState({
                    dataSource,
                });
            } else {
                message.warning(data.backMsg);
            }
        })
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/culture/artList/edit/${id}`
    }

    onReview = (id, index) => {
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
                        const dataSource = [...this.state.dataSource];
                        dataSource[index].state = 1;

                        this.setState({
                            dataSource,
                        });
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

                        const dataSource = [...this.state.dataSource].filter(item => item.key !== id);

                        this.setState({
                            dataSource,
                        });
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
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>文化展示</Breadcrumb.Item>
                            <Breadcrumb.Item>艺术品列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>艺术品列表</h1>
                </div>
                <div className='pageContent'>
                    <Card loading={loading}>
                        <Table
                            bordered={true}
                            dataSource={dataSource}
                            columns={this.columns}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

ArtList.contextTypes = {
    router: React.PropTypes.object
}

export default ArtList;