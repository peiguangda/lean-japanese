import * as React from "react";
import {Fragment} from "react";
import {Card, Icon, Progress, Tabs} from "antd";

const TabPane = Tabs.TabPane;

export interface Props {
}

export interface State {
}

export class LessonDetailTab extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    public render() {
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
        return (
            <Tabs defaultActiveKey="1" className="lesson-content w-100">
                <TabPane tab={question_tab} key="1">
                    <div className="row">
                        <div className="col-md-5">
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
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card
                                className="lesson-detail-card"
                                headStyle={{borderLeft: '2px solid #1890ff'}}
                                title={statistic_skill}
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </div>
                        <div className="col-md-3">
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
