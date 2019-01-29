import React from 'react';
import PropTypes from 'prop-types';
import {
    Icon,
    Breadcrumb,
    notification,
    message,
    Button,
    Alert
} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import util from 'Utils/util';
import '../index.less';

const queryListUrl = restUrl.ADDR + 'art/queryCommentList';
const queryAdminCommentListUrl = restUrl.ADDR + 'art/queryAdminCommentList';
const delUrl = restUrl.ADDR + 'art/deleteComment';

class CommentArt extends React.Component {
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
        if (this.props.params && this.props.params.id === undefined) {
            this.getList();
        }
    }

    getList = () => {
        this.setState({
            loading: true
        });
        let param = {};
        let url;
        if (this.props.params && this.props.params.id) {
            url = queryListUrl;
            param.artId = this.props.params.id;
        } else {
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
                this.setState({selectedRowKeys: []});

                notification.success({
                    message: '提示',
                    description: '批量删除评论成功！'
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
                            <Breadcrumb.Item>美食特产列表</Breadcrumb.Item>
                            <Breadcrumb.Item>评论列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>评论列表</h1>
                </div>
                <div className='pageContent'>
                    <ZZCard
                        loading={loading}
                        title={<Button
                            type="danger"
                            icon='delete'
                            disabled={loading}
                            loading={delLoading}
                            onClick={() => this.batchDel()
                            }>删除</Button>
                        }
                        extra={<Alert
                            message={<span>已选择 <a>{rowSelection.selectedRowKeys.length}</a> 项<a
                                style={{marginLeft: 20}}
                                onClick={() => this.setState({selectedRowKeys: []})}>清空</a></span>}
                            type="warning"
                            showIcon/>
                        }
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

CommentArt.contextTypes = {
    router: PropTypes.object
}

export default CommentArt;