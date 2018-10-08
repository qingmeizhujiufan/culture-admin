import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    InputNumber,
    Message,
    Button,
    Upload,
    Notification,
    Breadcrumb,
    Select,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import {formItemLayout, itemGrid} from 'Utils/formItemGrid';
import restUrl from 'RestUrl';
import '../index.less';
import ZZEditor from "Comps/zzEditor/zzEditor";
import {convertToRaw, EditorState} from "draft-js";

const FormItem = Form.Item;
const Option = Select.Option;
const queryListUrl = restUrl.ADDR + 'city/queryList';
const saveUrl = restUrl.ADDR + 'art/save';

class AddArt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: sessionStorage.type,
            fileList: [],
            editorState: EditorState.createEmpty(),
            cityList: [],
            loading: false,
            cityLoading: false
        };
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        this.setState({
            cityLoading: true
        });
        let param = {};
        ajax.getJSON(queryListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                this.setState({
                    cityList: backData,
                    cityLoading: false
                });
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

    saveEditorState = (editorState) => {
        this.setState({
            editorState
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.artCover = values.artCover.map(item => {
                    return item.response.data.id;
                }).join(',');
                values.artMoney = 0;
                values.artContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                values.creator = sessionStorage.userId;
                console.log('handleSubmit  param === ', values);
                this.setState({
                    loading: true
                });
                ajax.postJSON(saveUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        Notification.success({
                            message: '提示',
                            description: '新增美食特产成功！'
                        });

                        return this.context.router.push('/frame/culture/artList');
                    } else {
                        Message.error(data.backMsg);
                    }

                    this.setState({
                        loading: false
                    });
                });
            }
        });
    }

    render() {
        let {type, fileList, editorState, loading, cityList, cityLoading} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>文化展示</Breadcrumb.Item>
                            <Breadcrumb.Item>新增美食特产</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增美食特产</h1>
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
                                        {getFieldDecorator('artCover', {
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
                                <Col {...itemGrid}>
                                    <FormItem
                                        label="城市选择"
                                        {...formItemLayout}
                                    >
                                        <Spin spinning={cityLoading} indicator={<Icon type="loading"/>}>
                                            {getFieldDecorator('cityId', {
                                                rules: [{required: true, message: '城市不能为空!'}],
                                                initialValue: sessionStorage.cityId === 'null' ? undefined : sessionStorage.cityId
                                            })(
                                                <Select
                                                    disabled={type !== '1'}
                                                >
                                                    {
                                                        cityList.map(item => {
                                                            return (<Option key={item.id}
                                                                            value={item.id}>{item.cityName}</Option>)
                                                        })
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
                                        {getFieldDecorator('artTitle', {
                                            rules: [{required: true, message: '名称不能为空!'}],
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
                                        {getFieldDecorator('artBrief', {})(
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
                                    <Button size="large" type="primary" htmlType="submit" loading={loading}>提交</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedAddArt = Form.create()(AddArt);
AddArt.contextTypes = {
    router: PropTypes.object
}

export default WrappedAddArt;
