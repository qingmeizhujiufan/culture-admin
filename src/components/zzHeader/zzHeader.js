import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Row, Col, Modal, Icon, Input, Dropdown, Menu, Avatar, Tooltip, notification, Button, Form} from 'antd';
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

class ZZHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            visible: false,
        };

        this.menu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.showModifyModal}>修改密码</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <span onClick={this.logout}>退出登录</span>
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
        ajax.postJSON(logoutUrl, JSON.stringify(param), (data) => {
            if (data.success) {
                sessionStorage.clear();
                notification.open({
                    message: '已安全退出！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
                this.context.router.push('/login');
            } else {
                notification.warning({
                    message: data.backMsg
                });
            }
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        const {visible, loading} = this.state;
        const {collapsed, onToggleClick} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <Header className="zui-header">
                <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
                    <Col span={2}>
                        <Tooltip placement="right" title={collapsed ? '点击张开左侧菜单栏' : '点击收缩左侧菜单栏'}>
                            <Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={onToggleClick}
                            />
                        </Tooltip>
                    </Col>
                    <Col span={10}>
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <Dropdown overlay={this.menu}>
                            <a className="ant-dropdown-link">
                                <Avatar style={{verticalAlign: '-6px', backgroundColor: '#fc5a59'}} size="small"
                                        icon="user"/> 管理员<Icon type="down"/>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
                <Modal
                    visible={visible}
                    title="修改密码"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确认</Button>,
                    ]}
                >
                    <FormItem {...formItemLayout} label="原密码">
                        {getFieldDecorator('pwd', {
                            rules: [{
                                required: true,
                                message: '原密码不能为空',
                            }],
                        })(
                            <Input placeholder="请输入原密码"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="新密码">
                        {getFieldDecorator('newPwd', {
                            rules: [{
                                required: true,
                                message: '新密码不能为空',
                            }],
                        })(
                            <Input placeholder="请输入新密码"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="重复新密码">
                        {getFieldDecorator('newPwd', {
                            rules: [{
                                required: true,
                                message: '新密码不能为空',
                            }],
                        })(
                            <Input placeholder="请输入新密码"/>
                        )}
                    </FormItem>
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
