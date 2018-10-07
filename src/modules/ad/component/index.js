import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {
    Form,
    Row,
    Col,
    Breadcrumb,
    Icon,
    Button,
    Divider,
    Badge,
    Dropdown,
    Menu,
    notification,
    Collapse,
    Spin
} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';
import {message, Modal} from "antd/lib/index";

const Panel = Collapse.Panel;

const queryListUrl = restUrl.ADDR + 'ad/queryList';
const reviewUrl = restUrl.ADDR + 'ad/review';
const deleteUrl = restUrl.ADDR + 'ad/delete';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class Ad extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '广告名称',
            dataIndex: 'adTitle',
            key: 'adTitle',
            width: 200,
            align: 'center',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '链接',
            dataIndex: 'adLink',
            key: 'adLink'
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
            width: 200,
            align: 'center',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            fixed: 'right',
            width: 120,
            align: 'center',
            render: (text, record, index) => (
                <div>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <a onClick={() => this.onReview(record, index, 1)}>审核通过</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={() => this.onReview(record, index, -1)}>不合格</a>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <a className="ant-dropdown-link">审核</a>
                    </Dropdown>
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

    componentDidMount = () => {
        this.queryList();
    }

    //获取所有广告位
    queryList = () => {
        ajax.getJSON(queryListUrl, null, data => {
            if (data.success) {
                const backData = data.backData;
                backData.map(item => item.key = item.id);
                this.setState({
                    dataSource: backData,
                    loading: false
                });
            }
            else {

            }
        });
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/ad/platform/edit/${id}`
    }

    onReview = (record, index, state) => {
        Modal.confirm({
            title: '审核广告',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = record.id;
                param.state = state;
                param.creator = record.creator;
                ajax.postJSON(reviewUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '审核成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        const dataSource = [...this.state.dataSource];
                        dataSource[index].state = state;

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
                ajax.postJSON(deleteUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });

                        const dataSource = [...this.state.dataSource].filter(item => item.id !== key);

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
        let {
            dataSource,
            loading,
        } = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>平台概况</Breadcrumb.Item>
                            <Breadcrumb.Item>广告平台</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>广告管理</h1>
                </div>
                <div className='pageContent'>
                    <Row gutter={24}>
                        <Col>
                            <ZZCard title='广告列表' loading={loading} extra={<Button type="primary" icon="plus" href="#/frame/ad/platform/add">添加</Button>}>
                                <ZZTable
                                    dataSource={dataSource}
                                    columns={this.columns}
                                />
                            </ZZCard>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

Ad.contextTypes = {
    router: PropTypes.object
}

export default Ad;
