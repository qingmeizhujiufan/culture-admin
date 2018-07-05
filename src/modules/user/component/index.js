import React from 'react';
import {Icon, Divider, Breadcrumb, Spin, Card, Button} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import {
    Bar,
} from 'Comps/Charts';
import '../index.less';

const ButtonGroup = Button.Group;

const getNewlyUrl = restUrl.ADDR + 'user/getNewlyRegisterUserData';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            type: 'week',
            loading: true,
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getNewlyData();
    }

    getNewlyData = () => {
        let param = {};
        param.type = this.state.type;
        ajax.getJSON(getNewlyUrl, param, data => {
            if(data.success){
                data = data.backData;
                const chartData = [];
                data.map(item => {
                    chartData.push({
                        x: item.countDate,
                        y: item.num
                    });
                });
                this.setState({
                    data: chartData,
                    loading: false
                });
            }else {
                message.error(data.backMsg);
            }
        });
    }

    changeType = type => {
        this.setState({type: type}, () => {
            this.getNewlyData();
        });
    }

    render() {
        const {data, loading} = this.state;

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
                                <Button onClick={() => this.changeType('threeday')}>最近三天</Button>
                                <Button onClick={() => this.changeType('week')}>最近一周</Button>
                                <Button>最近一个月</Button>
                                <Button>最近半年</Button>
                            </ButtonGroup>
                        )}
                    >
                        <Spin spinning={loading}>
                            <Bar height={400} title="最近一周注册用户统计" data={data} />
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