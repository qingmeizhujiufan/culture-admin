import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Row, Col, Icon, Divider, Breadcrumb, Menu, Dropdown, Spin, Tabs, Badge, Button, List} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

import {message, Modal, notification} from "antd/lib/index";

const TabPane = Tabs.TabPane;
//获取所有兴趣圈图片
const queryListUrl = restUrl.ADDR + 'taste/queryListByAdmin';
const reviewUrl = restUrl.ADDR + 'taste/review';
const deleteUrl = restUrl.ADDR + 'taste/delete';
//获取TOP 10
const queryRankingListTop10Url = restUrl.ADDR + 'taste/queryRankingListTop10';

class Taste extends React.Component {
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
            align: 'center'
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
                        <span><Badge status="error"/>不合格</span>
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
                                    <Link to={'/frame/taste/commentTaste'}>查看评论</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={() => this.onDelete(record.key)}>删除</a>
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
            data_1: {},
            data_2: {},
            dataSource: [],
            loading_1: true,
            loading_2: true,
            loading_3: true,
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.queryList();
        this.queryRankingListTOP10('like');
        this.queryRankingListTOP10('comment');
    }

    //获取兴趣圈图片
    queryList = () => {
        ajax.getJSON(queryListUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => {
                    item.key = item.id;
                });
                this.setState({
                    dataSource: backData,
                    loading_1: false
                });
            }
        });
    }

    //获取TOP 10
    queryRankingListTOP10 = (type) => {
        const param = {};
        param.type = type;
        ajax.getJSON(queryRankingListTop10Url, param, data => {
            if (data.success) {
                let backData = data.backData;
                if (type == 'like') {
                    this.setState({
                        data_1: backData,
                        loading_2: false,
                    });
                } else if (type == 'comment') {
                    this.setState({
                        data_2: backData,
                        loading_3: false,
                    });
                }

            }
        });
    }

    editrouter = (id) => {
        return `/frame/company/editServiceAndHoliday/${id}`
    }

    onReview = (record, index, state) => {
        Modal.confirm({
            title: '审核图片',
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
                this.setState({loading_1: true});
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

                    this.setState({loading_1: false});
                });
            }
        });
    }

    render() {
        let {
            dataSource,
            data_1,
            data_2,
            loading_1,
            loading_2,
            loading_3,
        } = this.state;

        return (
            <div className="zui-content taste">
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
                            <ZZCard title='图片列表' loading={loading_1}>
                                <ZZTable
                                    bordered={true}
                                    dataSource={dataSource}
                                    columns={this.columns}
                                />
                            </ZZCard>
                        </Col>
                        <Col span={8}>
                            <ZZCard title='排行榜TOP 10' className='ranking-list'>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="点赞排行" key="1">
                                        <Spin spinning={loading_2}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={data_1}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<img
                                                                src={restUrl.BASE_HOST + item.tasteCover.filePath}/>}
                                                            title={<a>{item.tasteBrief}</a>}
                                                            description="Ant Design"
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </Spin>
                                    </TabPane>
                                    <TabPane tab="评论排行" key="2">
                                        <Spin spinning={loading_3}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={data_2}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<img
                                                                src={restUrl.BASE_HOST + item.tasteCover.filePath}/>}
                                                            title={<a>{item.tasteBrief}</a>}
                                                            description="Ant Design"
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </Spin>
                                    </TabPane>
                                </Tabs>
                            </ZZCard>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

Taste.contextTypes = {
    router: PropTypes.object
}

export default Taste;