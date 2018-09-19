import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
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
    Modal, Radio, Button, Switch
} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getLiveListUrl = restUrl.ADDR + 'culture/queryListByAdmin';
const reviewUrl = restUrl.ADDR + 'culture/review';
const delLiveUrl = restUrl.ADDR + 'culture/delete';
const settingRecommendUrl = restUrl.ADDR + 'culture/settingRecommend';

class CultureList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '标题',
            width: 250,
            dataIndex: 'cultureTitle',
            key: 'cultureTitle',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '描述',
            width: 300,
            dataIndex: 'cultureBrief',
            key: 'cultureBrief',
            render: (text, record, index) => (
                <div className='zui-ellipsis-2'>{text}</div>
            )
        }, {
            title: '所属城市',
            align: 'center',
            dataIndex: 'cityName',
            key: 'cityName',
        }, {
            title: '浏览数',
            align: 'right',
            dataIndex: 'readNum',
            key: 'readNum',
        }, {
            title: '收藏数',
            align: 'right',
            dataIndex: 'collectNum',
            key: 'collectNum',
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
                    disabled={sessionStorage.type === "3"}
                    onChange={checked => this.onRecommendChange(checked, record, index)}
                />
            )
        }, {
            title: '创建人',
            align: 'center',
            dataIndex: 'creatorName',
            key: 'creatorName',
            render: (text, record, index) => (
                <span>{text}-{record.typeName}</span>
            )
        }, {
            title: '创建时间',
            align: 'center',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            fixed: 'right',
            width: 120,
            align: 'center',
            render: (text, record, index) => (
                <div>
                    {
                        sessionStorage.type !== "3" ? (
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
                            </div>
                        ) : null
                    }
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link to={this.editrouter(record.id)}>编辑</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={'/frame/comment/commentCulture/' + record.id}>查看评论</Link>
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
            type: sessionStorage.type,
            loading: false,
            dataSource: [],
            searchText: '',
            state: 999
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
        param.userId = sessionStorage.userId;
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
        return `/frame/culture/cultureList/edit/${id}`
    }

    onReview = (record, index, state) => {
        Modal.confirm({
            title: '审核风土人情',
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

    onDelete = id => {
        Modal.confirm({
            title: '提示',
            content: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = id;
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
        const {loading, dataSource, searchText, state} = this.state;
        let n_dataSource = [...dataSource].filter(item => item.cultureTitle.indexOf(searchText) > -1);
        if (state !== 999) {
            n_dataSource = n_dataSource.filter(item => item.state === state);
        }

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>文化展示</Breadcrumb.Item>
                            <Breadcrumb.Item>风土人情列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>风土人情列表</h1>
                    <div className='search-area'>
                        <Row type='flex' justify="space-around" align="middle">
                            <Col span={8}>
                                <Search
                                    placeholder="搜索风土人情关键字"
                                    enterButton
                                    size="large"
                                    onSearch={searchText => this.setState({searchText})}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='pageContent'>
                    <ZZCard
                        loading={loading}
                        title={<Radio.Group value={state} onChange={e => this.setState({state: e.target.value})}>
                            <Radio.Button value={999}>所有</Radio.Button>
                            <Radio.Button value={0}>待审核</Radio.Button>
                            <Radio.Button value={1}>审核通过</Radio.Button>
                            <Radio.Button value={-1}>不合格</Radio.Button>
                        </Radio.Group>}
                        extra={<Button type="primary" icon='plus' href='#/frame/culture/cultureList/add'>新增风土人情</Button>}
                    >
                        <ZZTable
                            dataSource={n_dataSource}
                            columns={this.columns}
                            scroll={{x: 1500}}
                        />
                    </ZZCard>
                </div>
            </div>
        );
    }
}

CultureList.contextTypes = {
    router: PropTypes.object
}

export default CultureList;