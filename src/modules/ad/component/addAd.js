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
    Notification,
    Message,
    Breadcrumb,
    Spin, Select
} from 'antd';
import ajax from 'Utils/ajax';
import {formItemLayout, itemGrid} from 'Utils/formItemGrid';
import restUrl from 'RestUrl';
import '../index.less';

const Option = Select.Option;
const FormItem = Form.Item;

const queryListUrl = restUrl.ADDR + 'ad/queryList';
const saveUrl = restUrl.ADDR + 'ad/save';

const adList = [
    {
        value: 'culture_1',
        name: '旅游广告位'
    }, {
        value: 'taste_1',
        name: '图片展示广告位一'
    }, {
        value: 'taste_2',
        name: '图片展示广告位二'
    }
];

class AddAd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            options: [],
            submitLoading: false,
            adLoading: false
        };
    }

    componentDidMount = () => {
        this.queryList();
    }

    //获取所有广告位
    queryList = () => {
        const {options} = this.state;
        this.setState({adLoading: true});
        ajax.getJSON(queryListUrl, null, (data) => {
            if (data.success) {
                let backData = data.backData;
                const adsenseList = [];
                backData.map(item => {
                    adsenseList.push(item.adsense);
                });
                adList.map(item => {
                    options.push(<Option
                        key={item.value}
                        value={item.value}
                        disabled={adsenseList.findIndex((val => val === item.value)) > -1 ? true : false}
                    >{item.name}</Option>);
                })
                this.setState({
                    options,
                });
            }
            else {

            }
            this.setState({adLoading: false});
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
                this.setState({submitLoading: true});
                ajax.postJSON(saveUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        Notification.success({
                            message: '提示',
                            description: '新增广告成功！'
                        });

                        return this.context.router.push('/frame/ad/platform');
                    } else {
                        Message.error(data.backMsg);
                    }
                    this.setState({submitLoading: false});
                });
            }
        });
    }

    render() {
        let {options, fileList, submitLoading, adLoading} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>平台概况</Breadcrumb.Item>
                            <Breadcrumb.Item>广告平台</Breadcrumb.Item>
                            <Breadcrumb.Item>新增广告</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增广告</h1>
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
                                        {getFieldDecorator('adCover', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{required: true, message: '广告图片不能为空!'}],
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
                                        label="广告位选择"
                                        {...formItemLayout}
                                    >
                                        <Spin spinning={adLoading} indicator={<Icon type="loading"/>}>
                                            {getFieldDecorator('adsense', {
                                                rules: [{required: true, message: '广告位不能为空!'}],
                                            })(
                                                <Select>
                                                    {
                                                        options.map(item => item)
                                                    }
                                                </Select>
                                            )}
                                        </Spin>
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        label="名称"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('adTitle', {
                                            rules: [{required: true, message: '名称不能为空!'}],
                                        })(
                                            <Input placeholder=""/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        label="链接"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('adLink', {
                                            rules: [{required: true, message: '链接不能为空!'}],
                                        })(
                                            <Input placeholder=""/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className='toolbar'>
                                <div className='pull-right'>
                                    <Button type="primary" size='large' htmlType="submit"
                                            loading={submitLoading}>提交</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedAddAd = Form.create()(AddAd);
AddAd.contextTypes = {
    router: PropTypes.object
}

export default WrappedAddAd;
