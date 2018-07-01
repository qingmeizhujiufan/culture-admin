import React from 'react';
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
    Upload,
    notification,
    Tree,
    Spin,
    Tabs,
    message
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import util from 'Utils/util';
import '../index.less';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const getAllOrganizeInfoUrl = restUrl.ADDR + 'organize/getAllOrganizeInfo';
const saveBusUrl = restUrl.ADDR + 'company/saveBus';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class EditNews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
            submitLoading: false,
            addAdminLoading: false
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

                this.setState({
                    data: backData,
                    loading: false
                });
            }
        });
    }

    loadTree = list => {
        let tree = util.listToTree(list);
        console.log('tree ====  ', tree);
        if(tree){
            return (
                <Tree
                    showLine
                    defaultExpandAll={true}
                >
                    {this.loadTreeNode(tree)}
                </Tree>
            );
        }else {
            return null;
        }

    }

    loadTreeNode = (treeData) => {
        return treeData.map(item => {
            console.log('treenode item === ', item);
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode key={item.id} title={<span style={{fontSize: 14, color: '#000'}}>{`${item.userName}(${item.typeName})`}</span>}>
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

    addAdmin = () => {
        let param = {};
        param.userName = '001';

    }

    submitBus = () => {
        this.setState({
            submitLoading: true
        });
        let param = {};
        param.bus_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        ajax.postJSON(saveBusUrl, JSON.stringify(param), (data) => {
            if (data.success) {
                notification.open({
                    message: '班车信息更新成功！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
            } else {
                message.error(data.backMsg);
            }
            this.setState({
                submitLoading: false
            });
        });
    }

    render() {
        let {
            data,
            loading,
            submitLoading,
            addAdminLoading
        } = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>平台概况</Breadcrumb.Item>
                        <Breadcrumb.Item>组织权限</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Spin spinning={loading}>
                    <Row gutter={32}>
                        <Col span={5}>
                            <div className="ibox-content">
                                {this.loadTree(data)}
                            </div>
                        </Col>
                        <Col span={13}>
                            <div className="ibox-title">
                                <h5>组织权限管理</h5>
                            </div>
                            <div className="ibox-content">
                                <Divider></Divider>
                                <div style={{textAlign: 'center'}}>
                                    <Button type="primary" loading={submitLoading} onClick={this.submitBus}>
                                        确认
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" loading={addAdminLoading} onClick={this.addAdmin}>
                                新增普通管理员
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

const WrappedEditNews = Form.create()(EditNews);
EditNews.contextTypes = {
    router: React.PropTypes.object
}

export default WrappedEditNews;
