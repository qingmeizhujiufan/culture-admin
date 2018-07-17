import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Input,
    Icon,
    List,
    Divider,
    Breadcrumb,
    Badge,
    notification,
    Spin,
    Tabs,
    Table,
    message,
    Avatar
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const getSurveyListUrl = restUrl.ADDR + 'survey/getSurveyList';

class FolkloreShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getSurveyList();
    }

    getSurveyList = () => {
        this.setState({
            loading: true
        });
        ajax.getJSON(getSurveyListUrl, null, data => {
            if (data.success) {
                data = data.backData;

                this.setState({});
            }
            this.setState({
                loading: false
            });
        });
    }

    render() {
        const {loading} = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>新闻资讯</Breadcrumb.Item>
                            <Breadcrumb.Item>新闻列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新闻列表</h1>
                </div>
                <div className='pageContent'>
                    <Spin spinning={loading}>

                    </Spin>
                </div>
            </div>
        );
    }
}

FolkloreShow.contextTypes = {
    router: React.PropTypes.object
}

export default FolkloreShow;