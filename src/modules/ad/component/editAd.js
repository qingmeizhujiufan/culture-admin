import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    Divider,
    Button,
    Upload,
    notification,
    Message,
    Breadcrumb,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

const FormItem = Form.Item;

const queryDetailUrl = restUrl.ADDR + 'ad/queryDetail';
const saveUrl = restUrl.ADDR + 'ad/save';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class EditAd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            fileList: []
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
                const adCover = backData.newsCover;
                let photoList = [{
                    uid: adCover.id,
                    name: adCover.fileName,
                    status: 'done',
                    url: restUrl.BASE_HOST + adCover.filePath,
                    response: {
                        data: {
                            id: newsCover.id
                        }
                    }
                }];

                backData.adCover = photoList;

                this.setState({
                    data: backData,
                    fileList: photoList,
                    loading: false
                });
            } else {

            }
        });
    }

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
                values.adCover = values.adCover.map(item => {
                    return item.response.data.id;
                }).join(',');
                console.log('handleSubmit  param === ', values);
                ajax.postJSON(saveUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        notification.open({
                            message: '更新广告信息成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                    }else {
                        Message.error(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        let {data, fileList} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>平台概况</Breadcrumb.Item>
                            <Breadcrumb.Item>修改广告</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>更新广告信息</h1>
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
                                        {getFieldDecorator('adCover', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{required: true, message: '广告图片不能为空!'}],
                                            initialValue: data.adCover
                                        })(
                                            <Upload
                                                accept="image/*"
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
                                        {getFieldDecorator('adTitle', {
                                            rules: [{required: true, message: '名称不能为空!'}],
                                            initialValue: data.adTitle
                                        })(
                                            <Input placeholder=""/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="链接"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('adLink', {
                                            rules: [{required: true, message: '链接不能为空!'}],
                                            initialValue: data.adLink
                                        })(
                                            <Input placeholder=""/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className='toolbar'>
                                <div className='pull-right'>
                                    <Button type="primary" htmlType="submit">确认</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedEditAd = Form.create()(EditAd);
EditAd.contextTypes = {
    router: PropTypes.object
}

export default WrappedEditAd;
