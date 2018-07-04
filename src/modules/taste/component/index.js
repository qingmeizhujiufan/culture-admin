import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Table, Icon, Divider, Breadcrumb, Menu, Dropdown, Spin, Card, Tabs, Badge, Button} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../company.less';

import {message, Modal, notification} from "antd/lib/index";

const TabPane = Tabs.TabPane;
//获取所有兴趣圈图片
const queryListUrl = restUrl.ADDR + 'taste/queryList';

//获取公司服务信息
const getServiceListUrl = restUrl.ADDR + 'taste/GetServiceList';
const delServiceUrl = restUrl.ADDR + 'taste/delService';

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '图片名称',
            dataIndex: 'tasteCover',
            key: 'tasteCover',
            align: 'center',
            render: (text, record, index) => (
                <a href={restUrl.BASE_HOST + text.filePath} target='_blank'>{text.fileName}</a>
            )
        }, {
            title: '图片描述',
            dataIndex: 'tasteBrief',
            key: 'tasteBrief',
            align: 'center',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '喜欢数量',
            dataIndex: 'likeNum',
            key: 'likeNum',
            align: 'right',
        }, {
            title: '评论数量',
            dataIndex: 'commentNum',
            key: 'commentNum',
            align: 'right',
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
                        <span><Badge status="success"/>不合格</span>
                    );
                }
            }
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: (text, record, index) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <Link to={this.editrouter(record.id)}>编辑</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <a onClick={() => this.onDelete(record.key)}>删除</a>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <a className="ant-dropdown-link">操作</a>
                </Dropdown>
            ),
        }];

        this.state = {
            data_1: {},
            data_2: {},
            dataSource: [],
            loading: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.queryList();
    }

    //获取兴趣圈图片
    queryList = () => {
        ajax.getJSON(queryListUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                let service_1 = [], service_2 = [];
                let holiday_1 = [], holiday_2 = [];
                backData.map(item => {
                    item.key = item.id;
                });
                this.setState({
                    dataSource: backData,
                    service_2,
                    holiday_1,
                    holiday_2
                });
            }
        });
    }

    editrouter = (id) => {
        return `/frame/company/editServiceAndHoliday/${id}`
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
                ajax.postJSON(delServiceUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        this.getServiceList();
                        this.forceUpdate();
                    } else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        let {
            dataSource,
            loading,
            submitLoading_1,
            submitLoading_2,
        } = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>图片展示</Breadcrumb.Item>
                            <Breadcrumb.Item>图片管理</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>图片管理</h1>
                </div>
                <div className='pageContent'>
                    <Row gutter={24}>
                        <Col span={16}>
                            <Card title='图片列表'>
                                <Table
                                    bordered={true}
                                    dataSource={dataSource}
                                    columns={this.columns}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title='排行榜TOP 10'>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="点赞排行" key="1">

                                    </TabPane>
                                    <TabPane tab="评论排行" key="2">

                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

OrderList.contextTypes = {
    router: React.PropTypes.object
}

export default OrderList;