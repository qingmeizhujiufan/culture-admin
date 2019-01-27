import React from 'react';
import PropTypes from 'prop-types';
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
import {formItemLayout, itemGrid} from 'Utils/formItemGrid';
import restUrl from 'RestUrl';
import '../index.less';

const FormItem = Form.Item;
const saveUrl = restUrl.ADDR + 'video/save';
const queryDetailUrl = restUrl.ADDR + 'video/queryDetail';

class EditVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            fileList: [],
            fileContentList: [],
            loading: false,
            submitLoading: false
        };
    }

    componentDidMount = () => {
        this.queryDetail();
    }

    queryDetail = () => {
        this.setState({
            loading: true
        });
        let param = {};
        param.id = this.props.params.id;
        ajax.getJSON(queryDetailUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                const videoCover = backData.videoCover;
                let photoList = [{
                    uid: videoCover.id,
                    name: videoCover.fileName,
                    status: 'done',
                    url: restUrl.BASE_HOST + videoCover.filePath,
                    response: {
                        data: {
                            id: videoCover.id
                        }
                    }
                }];

                backData.videoCover = photoList;

                const videoFile = backData.videoFile;
                let videoFileList = [{
                    uid: videoFile.id,
                    name: videoFile.fileName,
                    status: 'done',
                    url: restUrl.BASE_HOST + videoFile.filePath,
                    response: {
                        data: {
                            id: videoFile.id
                        }
                    }
                }];

                backData.videoFile = videoFileList;

                this.setState({
                    data: backData,
                    fileList: photoList,
                    fileContentList: videoFileList,
                    loading: false
                });
            } else {

            }
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})

    handleContentChange = ({fileList}) => this.setState({fileContentList: fileList});

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = this.props.params.id;
                values.videoCover = values.videoCover.map(item => {
                    return item.response.data.id;
                }).join(',');
                values.videoFile = values.videoFile.map(item => {
                    return item.response.data.id;
                }).join(',');
                values.creator = sessionStorage.userId;
                console.log('handleSubmit  param === ', values);
                this.setState({
                    loading: true
                });
                ajax.postJSON(saveUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        notification.success({
                            message: '提示',
                            description: '修改视频信息成功！'
                        });

                        this.context.router.push('/frame/video/list');
                    } else {
                        message.error(data.backMsg);
                    }

                    this.setState({
                        loading: false
                    });
                });
            }
        });
    }

    render() {
        let {data, fileList, fileContentList, loading, submitLoading} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>在线视频</Breadcrumb.Item>
                            <Breadcrumb.Item>更新视频信息</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>更新视频信息</h1>
                </div>
                <div className='pageContent'>
                    <div className="ibox-content">
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        label="封面图片"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('videoCover', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{required: true, message: '封面图片不能为空!'}],
                                            initialValue: data.videoCover
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
                                <Col {...itemGrid}>
                                    <FormItem
                                        label="视频上传"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('videoFile', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{required: true, message: '视频不能为空!'}],
                                            initialValue: data.videoFile
                                        })(
                                            <Upload
                                                action={restUrl.UPLOAD}
                                                onChange={this.handleContentChange}
                                            >
                                                {fileContentList.length >= 1 ? null :
                                                    <Button><Icon type="upload"/> 上传</Button>}
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        label="名称"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('videoTitle', {
                                            rules: [{required: true, message: '名称不能为空!'}],
                                            initialValue: data.videoTitle
                                        })(
                                            <Input placeholder=""/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormItem
                                        label="简介"
                                        {...{
                                            labelCol: {span: 2},
                                            wrapperCol: {span: 20},
                                        }}
                                    >
                                        {getFieldDecorator('videoBrief', {
                                            initialValue: data.videoBrief
                                        })(
                                            <Input.TextArea autosize={{minRows: 4, maxRows: 6}}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className='toolbar'>
                                <div className='pull-right'>
                                    <Button size="large" type="primary" htmlType="submit"
                                            loading={submitLoading}>保存</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedEditVideo = Form.create()(EditVideo);
EditVideo.contextTypes = {
    router: PropTypes.object
}

export default WrappedEditVideo;
