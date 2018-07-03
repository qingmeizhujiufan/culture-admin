import React from 'react';
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    message,
    Button,
    Upload,
    notification,
    Breadcrumb,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertToRaw} from 'draft-js';

const FormItem = Form.Item;

const saveNewsUrl = restUrl.ADDR + 'news/save';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class AddNews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            editorState: EditorState.createEmpty(),
            loading: false
        };
    }

    componentDidMount = () => {
    }

    handleChange = ({fileList}) => this.setState({fileList})

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    saveEditorState = (editorState) => {
        this.setState({
            editorState
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.newsCover = values.newsCover.map(item => {
                    return item.response.data.id;
                }).join(',');
                values.newsContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                values.creator = sessionStorage.userId;
                console.log('handleSubmit  param === ', values);
                this.setState({
                    loading: true
                });
                ajax.postJSON(saveNewsUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        notification.open({
                            message: '新增新闻成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                        this.setState({
                            loading: false
                        });
                        this.context.router.push('/frame/news/newsList');
                    }else {
                        message.error(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        let {fileList, editorState, loading} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>新闻资讯</Breadcrumb.Item>
                            <Breadcrumb.Item>新增新闻</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增新闻</h1>
                </div>
                <div className='pageContent'>
                    <div className="ibox-content">
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="封面图片"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('newsCover', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{required: true, message: '封面图片不能为空!'}],
                                        })(
                                            <Upload
                                                action={restUrl.UPLOAD}
                                                listType={'picture'}
                                                className='upload-list-inline'
                                                onChange={this.handleChange}
                                            >
                                                {fileList.length >= 1 ? null :
                                                    <Button><Icon type="upload"/> 上传</Button>}
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="名称"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('newsTitle', {
                                            rules: [{required: true, message: '名称不能为空!'}],
                                        })(
                                            <Input placeholder=""/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="简介"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('newsBrief', {})(
                                            <Input.TextArea autosize={{minRows: 4, maxRows: 6}}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ZZEditor editorState={editorState} saveEditorState={this.saveEditorState}/>
                                </Col>
                            </Row>
                            <div className='toolbar'>
                                <div className='pull-right'>
                                    <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedAddLive = Form.create()(AddNews);
AddNews.contextTypes = {
    router: React.PropTypes.object
}

export default WrappedAddLive;
