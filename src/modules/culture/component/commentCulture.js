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
    Modal,
    Switch, Radio, Button, Alert
} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import util from 'Utils/util';
import '../index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const queryListUrl = restUrl.ADDR + 'culture/queryCommentList';
const queryAdminCommentListUrl = restUrl.ADDR + 'culture/queryAdminCommentList';
const delUrl = restUrl.ADDR + 'culture/deleteComment';

class CommentCulture extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '评论内容',
            width: 250,
            dataIndex: 'comment',
            key: 'comment'
        }, {
            title: '评论人',
            width: 120,
            align: 'center',
            dataIndex: 'userName',
            key: 'userName'
        }, {
            title: '创建时间',
            width: 120,
            align: 'center',
            dataIndex: 'create_time',
            key: 'create_time',
        }];

        this.state = {
            loading: false,
            delLoading: false,
            dataSource: [],
            selectedRowKeys: []
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    componentWillReceiveProps = nextProps => {
        if(this.props.params && this.props.params.id === undefined){
            this.getList();
        }
    }

    getList = () => {
        this.setState({
            loading: true
        });
        let param = {};
        let url;
        if(this.props.params && this.props.params.id){
            url = queryListUrl;
            param.cultureId = this.props.params.id;
        }else {
            url = queryAdminCommentListUrl;
            param.userId = sessionStorage.userId;
        }
        ajax.getJSON(url, param, data => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => {
                    item.key = item.id;
                });
                backData = util.listToTree(backData);
                this.setState({
                    dataSource: backData,
                    loading: false
                });
            }
        });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    batchDel = () => {
        const param = {};
        param.ids = this.state.selectedRowKeys.join(',');
        this.setState({
            delLoading: true
        });
        ajax.postJSON(delUrl, JSON.stringify(param), data => {
            if (data.success) {
                this.getList();

                notification.open({
                    message: '批量删除评论成功！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
            } else {
                message.error(data.backMsg);
            }
            this.setState({
                delLoading: false
            });
        });
    }

    render() {
        const {loading, selectedRowKeys, dataSource, delLoading} = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>文化展示</Breadcrumb.Item>
                            <Breadcrumb.Item>旅游列表</Breadcrumb.Item>
                            <Breadcrumb.Item>评论列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>评论列表</h1>
                </div>
                <div className='pageContent'>
                    <ZZCard
                        loading={loading}
                        title={(<div>
                                <Button
                                    type='primary'
                                    icon='close'
                                    disabled={loading}
                                    loading={delLoading}
                                    style={{marginBottom: 15}}
                                    onClick={() => this.batchDel()
                                    }>批量删除</Button>
                                <Alert style={{marginBottom: 15}}
                                       message={<span>已选择 <a>{rowSelection.selectedRowKeys.length}</a> 项<a
                                           style={{marginLeft: 20}}
                                           onClick={() => this.setState({selectedRowKeys: []})}>清空</a></span>}
                                       type="info" showIcon/>
                            </div>
                        )}
                    >
                        <ZZTable
                            dataSource={dataSource}
                            columns={this.columns}
                            rowKey={record => record.id}
                            rowSelection={rowSelection}
                        />
                    </ZZCard>
                </div>
            </div>
        );
    }
}

CommentCulture.contextTypes = {
    router: PropTypes.object
}

export default CommentCulture;