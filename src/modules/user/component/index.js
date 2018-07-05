import React from 'react';
import {Table, Icon, Divider, Breadcrumb, Spin} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../index.less';

const getUserListUrl = restUrl.ADDR + 'User/getUserList';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
}, {
    title: '住址',
    dataIndex: 'village',
    key: 'village',
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
        ajax.getJSON(getUserListUrl, null, (data) => {
            data = eval('(' + data.backData + ')');
            console.log('Index === ', data);
            data.map(function (item, index) {
                item.key = index;
            });
            this.setState({
                dataSource: data,
                loading: false
            });
        });
    }

    render() {
        const {dataSource, loading} = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>人员管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>所有用户</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Table
                            bordered={true}
                            dataSource={dataSource}
                            columns={columns}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;