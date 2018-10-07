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
    Notification,
    Spin,
    Tabs,
    Message,
    Modal,
    Switch, Radio, Button
} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
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
            title: '美食特产名称',
            width: 250,
            align: 'center',
            dataIndex: 'artTitle',
            key: 'artTitle',
            render: (text, record, index) => (
                <Link to={this.editrouter(record.id)}>{text}</Link>
            )
        }, {
            title: '描述',
            wdith: 300,
            dataIndex: 'artBrief',
            key: 'artBrief',
            render: (text, record, index) => (
                <div className='zui-ellipsis-2'>{text}</div>
            )
        }, {
            title: '所属城市',
            width: 120,
            align: 'center',
            dataIndex: 'cityName',
            key: 'cityName',
        }, {
            title: '浏览数',
            width: 100,
            align: 'right',
            dataIndex: 'readNum',
            key: 'readNum',
        }, {
            title: '收藏数',
            width: 100,
            align: 'right',
            dataIndex: 'collectNum',
            key: 'collectNum',
        }, {
            title: '审核状态',
            width: 120,
            dataIndex: 'state',
            key: 'state',
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
            width: 150,
            align: 'center',
            dataIndex: 'creatorName',
            key: 'creatorName',
            render: (text, record, index) => (
                <span>{text}-{record.typeName}</span>
            )
        }, {
            title: '创建时间',
            width: 200,
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
                            <div className='zui-inline-block'>
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
                                    <Link to={'/frame/comment/commentArt/' + record.id}>查看评论</Link>
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
                Notification.success({
                    message: '提示',
                    description: '推荐设置成功！'
                });
                const dataSource = [...this.state.dataSource];
                dataSource[index].isRecommend = checked ? 1 : 0;

                this.setState({
                    dataSource,
                });
            } else {
                Message.warning(data.backMsg);
            }
        })
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/culture/artList/edit/${id}`
    }

    onReview = (record, index, state) => {
        Modal.confirm({
            title: '审核美食特产',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = record.id;
                param.state = state;
                param.creator = record.creator;
                ajax.postJSON(reviewUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        Notification.success({
                            message: '提示',
                            description: '审核成功！'
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
                ajax.postJSON(delLiveUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        Notification.success({
                            message: '提示',
                            description: '删除成功！'
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
        let n_dataSource = [...dataSource].filter(item => item.artTitle.indexOf(searchText) > -1);
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
                            <Breadcrumb.Item>美食特产列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>美食特产列表</h1>
                    <div className='search-area'>
                        <Row type='flex' justify="space-around" align="middle">
                            <Col span={8}>
                                <Search
                                    placeholder="搜索美食特产关键字"
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
                        extra={<Button type="primary" icon='plus' href='#/frame/culture/artList/add'>新增美食特产</Button>}
                    >
                        <ZZTable
                            bordered={true}
                            dataSource={n_dataSource}
                            columns={this.columns}
                            scroll={{x: 1800}}
                        />
                    </ZZCard>
                </div>
            </div>
        );
    }
}

ArtList.contextTypes = {
    router: PropTypes.object
}

export default ArtList;