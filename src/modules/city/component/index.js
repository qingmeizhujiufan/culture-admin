import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Input,
    Button,
    Icon,
    Badge,
    Menu,
    Breadcrumb,
    Dropdown,
    Divider,
    notification,
    Spin,
    Tabs,
    Card,
    message,
    Table,
    Modal
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const queryListUrl = restUrl.ADDR + 'city/queryList';
const saveUrl = restUrl.ADDR + 'city/save';
const delLiveUrl = restUrl.ADDR + 'city/delete';

class CityList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '城市名称',
            align: 'center',
            dataIndex: 'cityName',
            key: 'cityName'
        }, {
            title: '创建时间',
            align: 'center',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            align: 'center',
            fixed: 'right',
            width: 120,
            render: (text, record, index) => (
                <div>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link to={this.editrouter(record.id)}>编辑</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={() => this.onDelete(record.id)}>删除</a>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <a className="ant-dropdown-link">操作</a>
                    </Dropdown>
                </div>
            ),
        }];

        this.state = {
            loading: false,
            dataSource: [],
            visible: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(queryListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;
                backData.map(item => {
                    item.key = item.id;
                });
                this.setState({
                    dataSource: backData,
                    loading: false
                });
            }
        });
    }

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/news/newsList/edit/${id}`
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
                ajax.postJSON(delLiveUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        notification.open({
                            message: '删除成功！',
                            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                        });

                        const dataSource = [...this.state.dataSource].filter(item => item.id !== key);

                        this.setState({
                            dataSource,
                        });
                    } else {
                        message.warning(data.backMsg);
                    }
                });
            }
        });
    }

    addCity = value => {
        const param = {};
        param.cityName = value;

        ajax.postJSON(saveUrl, JSON.stringify(param), data => {
            if(data.success){
                notification.open({
                    message: '开通城市成功！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
                this.getList();
            }else {
                message.error(data.backMsg);
            }
        });
    }

    render() {
        const {loading, dataSource} = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>城市管理</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>城市管理</h1>
                </div>
                <div className='pageContent'>
                    <Card
                        title="城市列表"
                        loading={loading}
                        extra={<Search
                            placeholder="请输入城市名..."
                            onSearch={value => this.addCity(value)}
                            enterButton='开通城市'
                            style={{width: 300}}
                        />}>
                        <Table
                            bordered={true}
                            dataSource={dataSource}
                            columns={this.columns}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

CityList.contextTypes = {
    router: React.PropTypes.object
}

export default CityList;