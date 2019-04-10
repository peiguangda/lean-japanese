import * as React from "react";
import {Fragment} from "react";
import {HorizontalGridLines, LineMarkSeries, RadialChart, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';
var moment = require('moment');
import {Card, Icon, Progress, Tabs, Select, Button, Tooltip, Rate, Input, Table} from "antd";
import {Link} from "react-router-dom";

const TabPane = Tabs.TabPane;

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Thời Gian',
        dataIndex: 'time',
        key: 'time',
    }, {
        title: 'Tỷ lệ hoàn thành ',
        dataIndex: 'type',
        key: 'type',
    }];
    const dataSource = [{
        stt: '1',
        name: 'Quỳnh Nga',
        time: '9/4/2019',
        type: '30%'
      }, {
        stt: '2',
        name: 'Quang Đại',
        time: '10/4/2019',
        type: '40%'
      }];

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

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
                                <div className= "row-info-panel">
                                    <label>Tổng số câu hỏi</label>
                                    <div>50 câu</div>
                                </div>
                                <div className= "row-info-panel">
                                    <label>Số câu hỏi mỗi lần</label>
                                    <div>
                                        <Select defaultValue="40 câu" style={{ width: 90 }} onChange={handleChange}>
                                            <Option value="30 câu">40 câu</Option>
                                            <Option value="30 câu">30 câu</Option>
                                            <Option value="20 câu">20 câu</Option>
                                            <Option value="10 câu">10 câu</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className= "row-info-panel">
                                    <label>Thời gian làm bài</label>
                                    <div>Không giới hạn</div>
                                </div>
                                <div className= "row-info-panel">
                                    <label>Số lần làm</label>
                                    <div>0 lần</div>
                                </div>
                                <div className= "row-info-panel">
                                    <label>Hiện đáp án</label>
                                    <div>
                                        <Select defaultValue="Hiện đáp án" style={{ width: 130 }} onChange={handleChange}>
                                            <Option value="Hiện đáp án">Hiện đáp án</Option>
                                            <Option value="Để sau">Để sau</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className= "row-info-panel">
                                    <label>Số lần làm lại</label>
                                    <div>Không giới hạn</div>
                                </div>
                                <div className= "row-info-panel">
                                    <Button type="primary">Làm bài</Button>
                                    <div>
                                        <Select defaultValue="Số câu hỏi(40)" style={{ width: 140 }} onChange={handleChange}>
                                            <Option value="0">Số câu hỏi(40)</Option>
                                            <Option value="1">Số câu hỏi(40)</Option>
                                            <Option value="2">Câu trả lời(0)</Option>
                                            <Option value="3">Trả lời sai(0)</Option>
                                            <Option value="4">Trả lời đúng(0)</Option>
                                        </Select>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={result_tab} key="2">
                    <div className="container">
                        <div className="this_is_block_panel_main">
                            <Table columns={columns} dataSource={dataSource}/>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={comment_tab} key="3">
                <div className="row reset-row-col">
                    <div className="col-xs-12 col-sm-12 reset-row-col padding_right_with_col-12">
                        <div className="this_is_block_panel_main_parent">
                            <div className="this_is_block_panel_main">
                                <div className="this_is_header_block_panel">
                                    <div className="this_is_header_left_block_panel">
                                        <div className="this_is_block_title">Bình luận
                                        </div>
                                    </div>
                                    <div className="this_is_header_right_block_panel"></div>
                                </div>
                                <div className="this_is_content_block_panel">
                                    <div className="body_panel_rating_of_viewer_panel">
                                        <Input placeholder="Đăng cái gì đó..."
                                             suffix={
                                                    <Tooltip title="Extra information">
                                                        <Icon type="upload"
                                                            style={{color: 'rgba(0,0,0,.45)'}}/>
                                                        <Icon type="paper-clip"></Icon>
                                                    </Tooltip>
                                                    }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row reset-row-col">
                    <div className="col-xs-12 col-sm-12 reset-row-col padding_right_with_col-12">
                        <div className="this_is_block_panel_main_parent">
                            <div className="this_is_block_panel_main1">
                            <div className="row">
                                <Icon type="smile" theme="filled" className="set_icon" />
                                <div className="col-11">
                                    <div className="row">
                                        <Link to="/users/1" className="set_comment1">Quỳnh Nga</Link>
                                        <p className="set_comment1">Bài học rất bổ ích</p>
                                    </div>
                                    <div className="row">
                                       <Link to="/users/1" className="set_comment3">Thích</Link>
                                       <Link to="/users/1" className="set_comment3">Trả lời</Link>
                                       <p className="set_comment2">18 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </TabPane>
            </Tabs>
        );
    }
}
