import React from 'react';
import PropTypes from 'prop-types';
import {
    Layout,
    Row,
    Col,
    Modal,
    Icon,
    Input,
    Dropdown,
    Menu,
    Avatar,
    Tooltip,
    Notification,
    Button,
    Form,
    Message,
    Badge,
    Divider
} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import './zzHeader.less';

const {Header} = Layout;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 10},
};

const logoutUrl = restUrl.ADDR + 'server/LoginOut';
const udpatePwdUrl = restUrl.ADDR + 'server/updatePwd';

class ZZHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDirty: false,
            loading: false,
            visible: false,
        };

        this.menu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.showModifyModal}><Icon type="key" theme="outlined"/> 修改密码</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <span onClick={this.logout}><Icon type="poweroff" theme="outlined"/> 退出登录</span>
                </Menu.Item>
            </Menu>
        );
    }

    showModifyModal = () => {
        this.setState({
            visible: true
        });
    }

    logout = () => {
        let param = {};
        param.userId = sessionStorage.userId;
        ajax.postJSON(logoutUrl, JSON.stringify(param), data => {
            if (data.success) {
                sessionStorage.clear();
                Notification.success({
                    message: '提示',
                    description: '已安全退出！'
                });

                this.context.router.push('/login');
            } else {
                Message.error(data.backMsg);
            }
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPwd')) {
            callback('密码不一致，请重新输入!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['comfirmNewPwd'], {force: true});
        }
        callback();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = sessionStorage.userId;
                values.userPwd = values.comfirmNewPwd;
                console.log('handleSubmit  param === ', values);
                this.setState({
                    submitLoading: true
                });
                ajax.postJSON(udpatePwdUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        Notification.success({
                            message: '提示',
                            description: '修改成功！'
                        });

                        this.setState({
                            visible: false
                        });
                    } else {
                        Message.error(data.backMsg);
                    }

                    this.setState({
                        submitLoading: false
                    });
                });
            }
        });
    }

    render() {
        const {visible, loading} = this.state;
        const {collapsed, onToggleClick} = this.props;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <Header className="zui-header">
                <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
                    <Col span={2}>
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={onToggleClick}
                        />
                    </Col>
                    <Col span={10}>
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <Badge count={0} title='个人消息' style={{backgroundColor: '#FFC32D'}}>
                            <span>
                            <Icon type="bell" theme="outlined"
                                  style={{fontSize: 20, color: '#fff', verticalAlign: 'text-bottom'}}/>
                          </span>
                        </Badge>
                        <Divider type="vertical" style={{margin: '0 30px'}}/>
                        <Dropdown overlay={this.menu} placement="bottomRight">
                            <a className="ant-dropdown-link" style={{color: '#fff'}}>
                                <Avatar
                                    className='zui-avatar'
                                    size="small"
                                    icon="user"
                                /> 管理员 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
                <Modal
                    visible={visible}
                    title="修改密码"
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="原密码">
                            {getFieldDecorator('oldPwd', {
                                rules: [{
                                    required: true, message: '密码不能为空!'
                                }],
                            })(
                                <Input type='password' placeholder="请输入原密码"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新密码">
                            {getFieldDecorator('newPwd', {
                                rules: [{
                                    required: true, message: '密码不能为空!'
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type='password' placeholder="请输入新密码"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="重复新密码">
                            {getFieldDecorator('comfirmNewPwd', {
                                rules: [{
                                    required: true, message: '重复新密码不能为空!'
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type='password' placeholder="请重复新密码"
                                       onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{span: 10, offset: 8}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                onClick={this.handleOk}
                                style={{marginRight: 15}}
                            >确认</Button>
                            <Button onClick={this.handleCancel}>取消</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </Header>
        );
    }
}

ZZHeader.contextTypes = {
    router: PropTypes.object
}

const WrappedZZHeader = Form.create()(ZZHeader);

export default WrappedZZHeader;
