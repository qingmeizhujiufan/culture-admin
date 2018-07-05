import React from 'react';
import {Table, Icon, Divider, Breadcrumb, Spin, Card, Button, message} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

const ButtonGroup = Button.Group;

const getNewlyUrl = restUrl.ADDR + 'user/getNewlyRegisterUserData';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
}, {
    title: '电话',
    dataIndex: 'telephone',
    key: 'telephone',
}];

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            loading: true,
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        var param = {};
        param.type = 'week';
        ajax.getJSON(getNewlyUrl, param, data => {
            if(data.success){
                data = data.backData;
                console.log('Index === ', data);
                data.map(function (item, index) {
                    item.key = index;
                });
                this.setState({
                    dataSource: data,
                    loading: false
                });
            }else {
                message.error(data.backMsg);
            }
        });
    }

    render() {
        const {dataSource, loading} = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                            <Breadcrumb.Item>统计分析</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>人员统计分析</h1>
                </div>
                <div className='pageContent'>
                    <Card
                        title="最近注册用户统计"
                        extra={(
                            <ButtonGroup>
                                <Button>最近三天</Button>
                                <Button>最近一周</Button>
                                <Button>最近一个月</Button>
                                <Button>最近半年</Button>
                            </ButtonGroup>
                        )}
                    >
                        <Spin spinning={loading}>
                            <Table
                                bordered={true}
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </Spin>
                    </Card>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;