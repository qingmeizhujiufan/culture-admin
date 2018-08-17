import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    Breadcrumb,
    Button,
    Upload,
    Select,
    notification,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';
import ZZEditor from '../../../components/zzEditor/zzEditor';

import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const Option = Select.Option;
const queryListUrl = restUrl.ADDR + 'city/queryList';
const queryDetailUrl = restUrl.ADDR + 'culture/queryDetail';
const saveLiveUrl = restUrl.ADDR + 'culture/save';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class EditCulture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: sessionStorage.type,
            data: {},
            fileList: [],
            cityList: [],
            editorState: EditorState.createEmpty(),
            loading: false,
            cityLoading: false
        };
    }

    componentDidMount = () => {
        this.getList();
        this.queryDetail();
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

    queryDetail = () => {
        this.setState({
            loading: true
        });
        let param = {};
        param.id = this.props.params.id;
        ajax.getJSON(queryDetailUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                if (backData.cultureContent && backData.cultureContent !== '') {
                    backData.cultureContent = draftToHtml(JSON.parse(backData.cultureContent));
                    const contentBlock = htmlToDraft(backData.cultureContent);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);

                    this.setState({
                        editorState
                    });
                }
                const cultureCover = backData.cultureCover;
                let photoList = [{
                    uid: cultureCover.id,
                    name: cultureCover.fileName,
                    status: 'done',
                    url: restUrl.BASE_HOST + cultureCover.filePath,
                    response: {
                        data: {
                            id: cultureCover.id
                        }
                    }
                }];

                backData.cultureCover = photoList;

                this.setState({
                    data: backData,
                    fileList: photoList,
                    loading: false
                });
            } else {

            }
        });
    }

    handleChange = ({fileList}) => {
        this.setState({
            fileList
        });
    }

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
                values.id = this.props.params.id;
                values.cultureCover = values.cultureCover.map(item => {
                    return item.response.data.id;
                }).join(',');
                values.cultureContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                console.log('handleSubmit  param === ', values);

                ajax.postJSON(saveLiveUrl, JSON.stringify(values), (data) => {
                    if (data.success) {
                        notification.open({
                            message: '修改文化信息成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });
                    }
                });
            }
        });
    }

    render() {
        let {type, data, fileList, editorState, loading, cityList, cityLoading} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>文化展示</Breadcrumb.Item>
                            <Breadcrumb.Item>文化列表</Breadcrumb.Item>
                            <Breadcrumb.Item>更新文化</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>修改文化信息</h1>
                </div>
                <div className='pageContent'>
                    <div className="ibox-content">
                        <Spin spinning={loading} size="large">
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label="封面图片"
                                            {...formItemLayout}
                                        >
                                            {getFieldDecorator('cultureCover', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                                rules: [{required: true, message: '封面图片不能为空!'}],
                                                initialValue: data.cultureCover
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
                                    <Col span={12}>
                                        <FormItem
                                            label="城市选择"
                                            {...formItemLayout}
                                        >
                                            <Spin spinning={cityLoading} indicator={<Icon type="loading"/>}>
                                                {getFieldDecorator('cityId', {
                                                    rules: [{required: true, message: '城市不能为空!'}],
                                                    initialValue: data.cityId
                                                })(
                                                    <Select
                                                        disabled={type !== '1'}
                                                    >
                                                        {
                                                            cityList.map(item => {
                                                                return (<Option key={item.id} value={item.id}>{item.cityName}</Option>)
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </Spin>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label="名称"
                                            {...formItemLayout}
                                        >
                                            {getFieldDecorator('cultureTitle', {
                                                rules: [{required: true, message: '名称不能为空!'}],
                                                initialValue: data.cultureTitle
                                            })(
                                                <Input placeholder=""/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            label="说明"
                                            {...formItemLayout}
                                        >
                                            {getFieldDecorator('cultureBrief', {
                                                initialValue: data.cultureBrief
                                            })(
                                                <Input.TextArea autosize={{minRows: 4, maxRows: 6}} maxLength={100}/>
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
                                        <Button
                                            size='large'
                                            type="primary"
                                            htmlType="submit"
                                            disabled={type === '1' ? false : !!data.state}
                                        >保存</Button>
                                    </div>
                                </div>
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedEditCulture = Form.create()(EditCulture);
EditCulture.contextTypes = {
    router: PropTypes.object
}

export default WrappedEditCulture;
