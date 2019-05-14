import * as React from "react";
import {Fragment} from "react";
import {
    FlexibleXYPlot,
    HorizontalGridLines,
    LineMarkSeries,
    makeVisFlexible,
    RadialChart,
    VerticalGridLines,
    XAxis,
    YAxis
} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';
import {Button, Card, Icon, Input, Progress, Select, Table, Tabs, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {LessonEntity} from "../../../common/types/lesson";
import {CardProgressEntity} from "../../../common/types/card_progress";
import {toArray} from "../../../helpers/Function";
import {TopicHistoryEntity} from "../../../common/types/topic_history";

var moment = require('moment');
const TabPane = Tabs.TabPane;
const FlexibleRadialChart = makeVisFlexible(RadialChart)

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

export interface Props {
    lesson: LessonEntity;
    props: any;
    isJustDoExam: boolean;
    listCardProgress: Array<CardProgressEntity>;
    listTopicHistory: Array<TopicHistoryEntity>;
}

export interface State {
    crosshairValues: Array<any>;
    setting_number_question_for_exam: number;
}

export class LessonDetailTab extends React.Component<Props, State, {}> {
    public handleChangeSettingNumQues = (value) => {
        this.setState({
            setting_number_question_for_exam: value
        })
        localStorage.setItem("setting_number_question_for_exam", value);
    }
    public handleChange = (value) => {
    }

    constructor(props) {
        super(props);
        this.state = {
            crosshairValues: [],
            setting_number_question_for_exam: 40
        };
        localStorage.setItem("setting_number_question_for_exam", "40");
    }

    componentWillMount() {
    }

    public render() {
        let {lesson, props, listCardProgress, isJustDoExam, listTopicHistory} = this.props;
        let {setting_number_question_for_exam} = this.state;
        listCardProgress = toArray(listCardProgress);
        let count = (number) => {
            let countNum = 0;
            listCardProgress && listCardProgress.map((cardProgress, index) => {
                if (cardProgress.box_num == number) countNum++;
            });
            return countNum;
        };
        //can update luon vao db
        let lesson_progress = () => {
            let progress = 0;
            listCardProgress && listCardProgress.map((cardProgress, index) => {
                progress += cardProgress.progress;
            });
            return progress / listCardProgress.length;
        };
        let countBoxNum0 = count(0);
        let countBoxNum1 = count(1);
        let countBoxNum2 = count(2);
        let countBoxNum3 = count(3);
        let countBoxNum4 = count(4);
        let progress = lesson_progress();
        const now = moment(new Date('01/2/2018')).format("MMM Do YY");
        const result_tab = <Fragment><Icon type="info-circle" theme="twoTone"/>Kết quả</Fragment>;
        const comment_tab = <Fragment><Icon type="book" theme="twoTone"/>Bình luận</Fragment>;
        const question_tab = <Fragment><Icon type="question-circle" theme="twoTone"/>Câu hỏi</Fragment>;
        const video_tab = <Fragment><Icon type="fund" theme="twoTone"/>Video</Fragment>;

        const statistic_studycase = <Fragment>
            <Icon type="reconciliation" theme="twoTone" twoToneColor="#eb2f96" className="mr-2"/>
            Thống kê Bài tập
        </Fragment>;
        const statistic_skill = <Fragment>
            <Icon type="thunderbolt" theme="twoTone" twoToneColor="#eb2f96" className="mr-2"/>
            Thống kê kỹ năng
        </Fragment>;
        const basic_info = <Fragment><Icon type="profile" theme="twoTone" twoToneColor="#eb2f96" className="mr-2"/>
            Thông tin chung
        </Fragment>;
        const myData = [
            {angle: countBoxNum0, className: 'red'},
            {angle: countBoxNum3, className: 'dark_blue'},
            {angle: countBoxNum1, className: 'blue'},
            {angle: countBoxNum2, className: 'dark_red'},
            {angle: countBoxNum4, className: 'yellow'}];
        const data = [];
        listTopicHistory && toArray(listTopicHistory).map((item, index) => {
            data.push({x: moment(new Date(item.updated_at)).format("LLL"), y: item.correct});
        });
        return (
            <Tabs defaultActiveKey="1" className="lesson-content w-100">
                <TabPane tab={question_tab} key="1">
                    <div className="row">
                        {/*--------------------------biểu đồ thống kê bài tập---------------------------*/}
                        <Card
                            className="lesson-detail-card col-md-5 ml-5 mr-2"
                            title={statistic_studycase}
                            headStyle={{borderLeft: '2px solid #1890ff'}}
                        >
                            <div className="row w-100 mb-2 justify-content-center">Tiến độ bài tập</div>
                            <div className="row justify-content-center">
                                <Progress type="circle" percent={Number((progress).toFixed(1))} width={60}
                                          status="active"/>
                            </div>
                            <div className="row w-100 mt-3 detail-statistic justify-content-center">
                                Thống kê chi tiết
                            </div>
                            <div className="row">
                                <div className={"col-md-6"}>
                                    <FlexibleRadialChart
                                        data={myData}
                                        showLabels
                                        // animation={true}
                                        height={250}/>
                                </div>
                                <div className="col-md-5 ml-2 mt-5">
                                    <div className="row">
                                        <div className="mt-1 squares red"></div>
                                        <div className="col-md-10">Câu hỏi chưa trả lời ({countBoxNum0})</div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-1 squares dark_blue"></div>
                                        <div className="col-md-10">Trả lời sai ({countBoxNum3})</div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-1 squares blue"></div>
                                        <div className="col-md-10">Trả lời đúng 1 lần ({countBoxNum1})</div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-1 squares dark_red"></div>
                                        <div className="col-md-10">Trả lời đúng 2 lần ({countBoxNum2})</div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-1 squares yellow"></div>
                                        <div className="col-md-10">Câu trả lời đã thuộc ({countBoxNum4})</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {/*--------------------------biểu đồ Thống kê kỹ năng---------------------------*/}
                        <Card
                            className="lesson-detail-card col-md-3 mr-2 w-100 h-100"
                            headStyle={{borderLeft: '2px solid #1890ff'}}
                            title={statistic_skill}
                        >
                            <FlexibleXYPlot xType="ordinal" height={300} className="xyplot-custom mt-5 mb-5 ml-2 mr-2">
                                <VerticalGridLines/>
                                <HorizontalGridLines/>
                                <XAxis title="Ngày tháng" tickLabelAngle={-45}/>
                                <YAxis title="Số câu trả lời đúng"/>
                                <LineMarkSeries
                                    style={{
                                        strokeWidth: '2px'
                                    }}
                                    animation
                                    colorType={'category'}
                                    stroke={'#ddd'}
                                    strokeWidth={2}
                                    lineStyle={{stroke: 'red'}}
                                    markStyle={{stroke: 'blue'}}
                                    data={data}
                                />
                            </FlexibleXYPlot>
                        </Card>
                        {/*--------------------------Thông tin chung---------------------------*/}
                        <Card
                            className="lesson-detail-card col-md-3"
                            title={basic_info}
                            headStyle={{borderLeft: '2px solid #1890ff'}}
                        >
                            <div className="row-info-panel row">
                                <label className="col-md-6">Tổng số câu hỏi</label>
                                <div className="col-md-5 float-left">{lesson.question_number} câu</div>
                            </div>
                            <div className="row-info-panel row">
                                <label className="col-md-6">Số câu hỏi mỗi lần</label>
                                <Select defaultValue="40" value={setting_number_question_for_exam} style={{width: 90}}
                                        onChange={this.handleChangeSettingNumQues}
                                        className="col-md-5 float-left">
                                    <Option value="40">40 câu</Option>
                                    <Option value="30">30 câu</Option>
                                    <Option value="20">20 câu</Option>
                                    <Option value="10">10 câu</Option>
                                </Select>
                            </div>
                            <div className="row-info-panel row">
                                <label className="col-md-6">Thời gian làm bài</label>
                                <div className="col-md-5 float-left">Không giới hạn</div>
                            </div>
                            <div className="row-info-panel row">
                                <label className="col-md-6">Số lần làm</label>
                                <div className="col-md-5 float-left">0 lần</div>
                            </div>
                            <div className="row-info-panel row">
                                <label className="col-md-6">Hiện đáp án</label>
                                <Select defaultValue="Hiện đáp án" style={{width: 130}} onChange={this.handleChange}
                                        className="col-md-5 float-left">
                                    <Option value="Hiện đáp án">Hiện đáp án</Option>
                                    <Option value="Để sau">Để sau</Option>
                                </Select>
                            </div>
                            <div className="row-info-panel row">
                                <label className="col-md-6">Số lần làm lại</label>
                                <div className="col-md-5 float-left">Không giới hạn</div>
                            </div>
                            <div className="row-info-panel row">
                                <Button type="primary" className="col-md-6" id="btn-do-ex"
                                        href={`${props.location.pathname}/exam`}
                                        onClick={() => localStorage.setItem("isJustDoExam", "FALSE")}>
                                    Làm bài
                                </Button>
                                <Select defaultValue="Số câu hỏi(40)" style={{width: 140}}
                                        onChange={this.handleChange} className="col-md-5 float-left">
                                    <Option value="0">Số câu hỏi(40)</Option>
                                    <Option value="1">Số câu hỏi(40)</Option>
                                    <Option value="2">Câu trả lời(0)</Option>
                                    <Option value="3">Trả lời sai(0)</Option>
                                    <Option value="4">Trả lời đúng(0)</Option>
                                </Select>
                            </div>
                            {isJustDoExam ? <div className="row-info-panel row">
                                <Button type="primary" className="w-100" id="btn-review"
                                        href={`${props.location.pathname}/exam`}>Xem lại</Button>
                            </div> : ""}
                        </Card>
                    </div>
                </TabPane>
                {/*--------------------------video---------------------------*/}
                <TabPane tab={video_tab} key="2">
                    <div className="container">
                        <div className="set_video" dangerouslySetInnerHTML={{__html: lesson.description}}/>
                    </div>
                </TabPane>
                <TabPane tab={result_tab} key="3">
                    <div className="container">
                        <div className="this_is_block_panel_main">
                            <Table columns={columns} dataSource={dataSource}/>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={comment_tab} key="4">
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
                                        <Icon type="smile" theme="filled" className="set_icon"/>
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
