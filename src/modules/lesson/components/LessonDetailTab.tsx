import * as React from "react";
import {Fragment} from "react";
import {Card, Icon, Progress, Tabs} from "antd";
import {HorizontalGridLines, LineMarkSeries, RadialChart, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';

var moment = require('moment');

const TabPane = Tabs.TabPane;

export interface Props {
}

export interface State {
    crosshairValues: Array<any>;
}

export class LessonDetailTab extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            crosshairValues: []
        };
    }

    componentWillMount() {
    }

    public render() {
        // console.log("value", this.state.crosshairValues);
        const now = moment().format("MMM Do YY");
        const result_tab = <Fragment><Icon type="info-circle" theme="twoTone"/>Kết quả</Fragment>;
        const comment_tab = <Fragment><Icon type="book" theme="twoTone"/>Bình luận</Fragment>;
        const question_tab = <Fragment><Icon type="question-circle" theme="twoTone"/>Câu hỏi</Fragment>;


        const statistic_studycase = <Fragment><Icon type="reconciliation" theme="twoTone" twoToneColor="#eb2f96"
                                                    className="mr-2"/>Thống
            kê Bài tập</Fragment>;
        const statistic_skill = <Fragment><Icon type="thunderbolt" theme="twoTone" twoToneColor="#eb2f96"
                                                className="mr-2"/>Thống kê kỹ
            năng</Fragment>;
        const basic_info = <Fragment><Icon type="profile" theme="twoTone" twoToneColor="#eb2f96" className="mr-2"/>Thông
            tin
            chung</Fragment>;
        const myData = [
            {angle: 1, className: 'red'},
            {angle: 2, className: 'dark_blue'},
            {angle: 5, className: 'blue'},
            {angle: 3, className: 'dark_red'},
            {angle: 5, className: 'yellow'}];

        return (
            <Tabs defaultActiveKey="1" className="lesson-content w-100">
                <TabPane tab={question_tab} key="1">
                    <div className="row">
                        <div className="col-md-5">
                            {/*--------------------------biểu đồ thống kê bài tập---------------------------*/}
                            <Card
                                className="lesson-detail-card"
                                title={statistic_studycase}
                                headStyle={{borderLeft: '2px solid #1890ff'}}
                            >
                                <div className="row w-100 justify-content-center">Tiến độ bài tập</div>
                                <div className="row justify-content-center">
                                    <Progress type="circle" percent={30} width={80}/>
                                </div>
                                <div className="row w-100 justify-content-center">Thống kê chi tiết</div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <RadialChart
                                            data={myData}
                                            width={300}
                                            height={300}/>
                                    </div>
                                    <div className="col-md-5 ml-2 mt-5">
                                        <div className="row">
                                            <div className="mt-1 squares red"></div>
                                            <div className="col-md-10">Câu hỏi chưa trả lời (40)</div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-1 squares dark_blue"></div>
                                            <div className="col-md-10">Trả lời sai (0)</div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-1 squares blue"></div>
                                            <div className="col-md-10">Trả lời đúng 1 lần (0)</div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-1 squares dark_red"></div>
                                            <div className="col-md-10">Trả lời đúng 2 lần (0)</div>
                                        </div>
                                        <div className="row">
                                            <div className="mt-1 squares yellow"></div>
                                            <div className="col-md-10">Câu trả lời đã thuộc (0)</div>
                                        </div>
                                    </div>
                                </div>

                            </Card>
                        </div>
                        <div className="col-md-4">
                            {/*--------------------------biểu đồ Thống kê kỹ năng---------------------------*/}
                            <Card
                                className="lesson-detail-card"
                                headStyle={{borderLeft: '2px solid #1890ff'}}
                                title={statistic_skill}
                            >
                                <XYPlot width={500} height={300} xType="time">
                                    <VerticalGridLines/>
                                    <HorizontalGridLines/>
                                    <XAxis/>
                                    <YAxis/>
                                    <LineMarkSeries
                                        className="linemark-series-example"
                                        style={{
                                            strokeWidth: '3px'
                                        }}
                                        lineStyle={{stroke: 'red'}}
                                        markStyle={{stroke: 'blue'}}
                                        data={[{x: new Date('01/01/2018'), y: 75},
                                            {x: new Date('01/2/2018'), y: 60},
                                            {x: new Date('01/3/2018'), y: 80},
                                            {x: new Date('01/4/2018'), y: 90}]}
                                    />
                                </XYPlot>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            {/*--------------------------Thông tin chung---------------------------*/}
                            <Card
                                className="lesson-detail-card"
                                title={basic_info}
                                headStyle={{borderLeft: '2px solid #1890ff'}}
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={result_tab} key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab={comment_tab} key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        );
    }
}
