import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Row,
    Col,
    Breadcrumb,
    Icon,
    Input,
    Select,
    Divider,
    Button,
    notification,
    Tree,
    Spin,
    Tabs,
    message
} from 'antd';
import {ZZCard, ZZTable} from 'Comps/zz-antD';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import util from 'Utils/util';
import '../index.less';
import {convertToRaw} from "draft-js";
import {Modal} from "antd/lib/index";

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const getAllOrganizeInfoUrl = restUrl.ADDR + 'organize/getAllOrganizeInfo';
const saveUrl = restUrl.ADDR + 'organize/save';
const delAdminUrl = restUrl.ADDR + 'organize/delete';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class Organize extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '名称',
            dataIndex: 'userName',
            key: 'userName',
            align: 'left'
        }, {
            title: '类型',
            dataIndex: 'typeName',
            key: 'typeName',
            align: 'center'
        }, {
            width: 180,
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center'
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            width: 120,
            align: 'center',
            render: (text, record, index) => (
                <div>
                    <a onClick={() => this.onDelete(record.id)}>删除</a>
                </div>
            )
        }];

        this.state = {
            data: [],
            loading: true,
            submitLoading: false
        };
    }

    componentDidMount = () => {
        this.getAllOrganizeInfo();
    }

    //获取组织信息
    getAllOrganizeInfo = () => {
        this.setState({
            loading: true
        });
        ajax.getJSON(getAllOrganizeInfoUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => item.key = item.id);

                this.setState({
                    data: backData,
                    loading: false
                });
            }
        });
    }

    loadTree = list => {
        let tree = util.listToTree(list);
        if (tree) {
            return (
                <Tree
                    showLine
                    defaultExpandAll={true}
                >
                    {this.loadTreeNode(tree)}
                </Tree>
            );
        } else {
            return null;
        }

    }

    loadTreeNode = (treeData) => {
        return treeData.map(item => {
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode key={item.id} title={<span
                        style={{fontSize: 14, color: '#000'}}>{`${item.userName}(${item.typeName})`}</span>}>
                        {this.loadTreeNode(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    key={item.id}
                    title={`${item.userName}(${item.typeName})`}
                />
            );
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.pId = sessionStorage.userId;
                console.log('handleSubmit  param === ', values);
                this.setState({
                    submitLoading: true
                });
                ajax.postJSON(saveUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        notification.open({
                            message: '新增管理员成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });

                        this.setState({
                            submitLoading: false
                        });

                        this.getAllOrganizeInfo();
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
                ajax.postJSON(delAdminUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        let dataSource = [...this.state.data];
                        dataSource = dataSource.filter(item => item.id !== key);
                        this.setState({
                            data: dataSource
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
            data,
            loading,
            submitLoading
        } = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;
        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>平台概况</Breadcrumb.Item>
                            <Breadcrumb.Item>组织权限</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>组织管理</h1>
                </div>
                <div className='pageContent'>
                    <Row gutter={32}>
                        <Col span={6}>
                            <ZZCard loading={loading} title="组织树">
                                {this.loadTree(data)}
                            </ZZCard>
                        </Col>
                        <Col span={18}>
                            <ZZCard loading={loading} title="管理员管理">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={<span><Icon type="bars"/>管理员列表</span>} key="1">
                                        <ZZTable
                                            dataSource={util.listToTree(data)}
                                            columns={this.columns}
                                            bordered={true}
                                        />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="plus-square"/>新增管理员</span>} key="2">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col span={12}>
                                                    <FormItem
                                                        label="用户名"
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('userName', {
                                                            rules: [{required: true, message: '用户名不能为空!'}],
                                                        })(
                                                            <Input placeholder="用户名"/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem
                                                        label="密码"
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('pwd', {
                                                            rules: [{required: true, message: '密码不能为空!'}],
                                                        })(
                                                            <Input type='password' placeholder="密码"/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>
                                                    <FormItem
                                                        label="重复密码"
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('userPwd', {
                                                            rules: [{required: true, message: '重复密码不能为空!'}],
                                                        })(
                                                            <Input type='password' placeholder="重复密码"/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem
                                                        label="类型"
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('typeName', {
                                                            initialValue: '管理员'
                                                        })(
                                                            <Input disabled/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Divider/>
                                            <Row>
                                                <Col offset={3}>
                                                    <Button type="primary" htmlType="submit" loading={submitLoading}>
                                                        新增管理员
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
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

const WrappedOrganize = Form.create()(Organize);
Organize.contextTypes = {
    router: PropTypes.object
}

export default WrappedOrganize;
