import React from 'react';
import {Layout, Menu, Icon, Row, Col, Steps, Carousel, Progress, Timeline, Card} from 'antd';
import {ZZCard} from 'Comps/zz-antD';
import {
    Bar,
} from 'Comps/Charts';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../home.less';
import cover from 'Img/cover.jpg';
import profileCover from 'Img/profile-cover.jpg';

const Step = Steps.Step;
const {Meta} = Card;

// 数据源
const data = [
    {x: 'Sports', y: 275, income: 2300},
    {x: 'Strategy', y: 115, income: 667},
    {x: 'Action', y: 120, income: 982},
    {x: 'Shooter', y: 350, income: 5271},
    {x: 'Other', y: 150, income: 3710}
];

const getWebTotalUrl = restUrl.ADDR + 'Server/getWebTotal';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data,
            webTotal: {},
            totalLoading: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getWebTotal();
    }

    getWebTotal = () => {
        this.setState({totalLoading: true});
        ajax.getJSON(getWebTotalUrl, null, data => {
           if(data.success){
               this.setState({
                   webTotal: data.backData,
                   totalLoading: false
               });
           } else {

           }
        });
    }

    render() {
        const {data, webTotal, totalLoading} = this.state;
        return (
            <div className="zui-content home">
                <div className='pageContent'>
                    <Row gutter={24} className="base-info">
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <ZZCard loading={totalLoading}>
                                <Row type="flex" align="middle">
                                    <Col><Icon type="user" className="icon"
                                               style={{backgroundColor: '#2dcb73', color: '#fff'}}/></Col>
                                    <Col>
                                        <h3>{webTotal.userTotal}</h3>
                                        <span>用户人数</span>
                                    </Col>
                                </Row>
                            </ZZCard>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <ZZCard loading={totalLoading}>
                                <Row type="flex" align="middle">
                                    <Col><Icon type="picture" className="icon"
                                               style={{backgroundColor: '#ff604f', color: '#fff'}}/></Col>
                                    <Col>
                                        <h3>{webTotal.tasteTotal}</h3>
                                        <span>美图总数</span>
                                    </Col>
                                </Row>
                            </ZZCard>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <ZZCard loading={totalLoading}>
                                <Row type="flex" align="middle">
                                    <Col><Icon type="youtube" className="icon"
                                               style={{backgroundColor: '#faad14', color: '#fff'}}/></Col>
                                    <Col>
                                        <h3>{webTotal.videoTotal}</h3>
                                        <span>视频总数</span>
                                    </Col>
                                </Row>
                            </ZZCard>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <ZZCard loading={totalLoading}>
                                <Row type="flex" align="middle">
                                    <Col><Icon type="cloud" className="icon"
                                               style={{backgroundColor: '#1890ff', color: '#fff'}}/></Col>
                                    <Col>
                                        <h3>{webTotal.artTotal}</h3>
                                        <span>艺术品总数</span>
                                    </Col>
                                </Row>
                            </ZZCard>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={9}>
                            <div className="slider-box">
                                <Carousel autoplay>
                                    <div><img src={cover}/></div>
                                    <div><img src={profileCover}/></div>
                                </Carousel>
                                <div className="footer">这是首页轮播图</div>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="ibox-title">
                                <h5>订单情况</h5>
                            </div>
                            <div className="ibox-content">
                                <Row type="flex" justify="space-between" align="top">
                                    <Col xs={24} sm={16} md={8}>
                                        <Progress type="dashboard" percent={75} format={(percent) => percent + '%'}
                                                  style={{margin: '25px 0'}}/>
                                        <div>
                                            <h3>完成率</h3>
                                            <p>这是说明</p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={16} md={8}>
                                        <Progress type="dashboard" percent={70} status="exception"
                                                  format={(percent) => percent + '%'} style={{margin: '25px 0'}}/>
                                        <div>
                                            <h3>取消率</h3>
                                            <p>这是说明</p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={16} md={8}>
                                        <Progress type="dashboard" percent={80} status="success"
                                                  format={(percent) => percent + '%'} style={{margin: '25px 0'}}/>
                                        <div>
                                            <h3>支付达成率</h3>
                                            <p>这是说明</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={5}>
                            <div className="ibox-title">
                                <h5>项目进度</h5>
                            </div>
                            <div className="ibox-content">
                                <Steps direction="vertical" current={1}>
                                    <Step title="Finished" description="This is a description."/>
                                    <Step title="In Progress" description="This is a description."/>
                                    <Step title="Waiting" description="This is a description."/>
                                </Steps>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{marginTop: '15px'}}>
                        <Col span={7}>
                            <div className="ibox-title" style={{backgroundColor: '#fc5a59'}}>
                                <h5 style={{color: '#fff'}}>这是标题</h5>
                            </div>
                            <div className="ibox-content">
                                <Timeline>
                                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                                   color="red">Technical testing 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                </Timeline>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="ibox-title" style={{backgroundColor: '#6495ed'}}>
                                <h5 style={{color: '#fff'}}>这是图表</h5>
                            </div>
                            <div className="ibox-content">
                                <Bar height={400} title="销售额趋势" data={data}/>
                                {/*<Chart*/}
                                {/*height={400}*/}
                                {/*padding='auto'*/}
                                {/*forceFit*/}
                                {/*data={data}*/}
                                {/*scale={cols}*/}
                                {/*>*/}
                                {/*<Axis name="genre"/>*/}
                                {/*<Axis name="sold"/>*/}
                                {/*<Legend position="top" dy={20}/>*/}
                                {/*<Tooltip/>*/}
                                {/*<Geom type="interval" position="genre*sold" color="genre"/>*/}
                                {/*</Chart>*/}
                            </div>
                        </Col>
                        <Col span={5}>
                            <Card
                                hoverable
                                cover={<img alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                            >
                                <Meta
                                    title="Europe Street beat"
                                    description="www.instagram.com"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

// Index.contextTypes = {
//     router: React.PropTypes.object
// }

export default Index;
