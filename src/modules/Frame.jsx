import React from 'react';
import {Layout} from 'antd';
import ZZHeader from '../containers/zzHeader';
import ZZLeftSide from '../containers/zzLeftSide';
import ZZFooter from 'Comps/zzFooter/zzFooter';
import {Scrollbars} from 'react-custom-scrollbars';

const {Content} = Layout;

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <ZZLeftSide/>
                <Layout>
                    <ZZHeader/>
                    <Content>
                        <Scrollbars style={{height: 'calc(100vh - 64px)'}}>
                            {this.props.children}
                            <ZZFooter/>
                        </Scrollbars>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}