import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Button, Card, Icon, Input, Layout, PageHeader, Tabs} from 'antd';
import {LessonEntity} from "../../../common/types/lesson";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {ListExerciseContainter} from "./exercise/container";
import {ExerciseModal} from "../../modal/exercise/components/ExerciseModal";
import {NavigationBarContainter} from "../../navigation_bar/container";

const TabPane = Tabs.TabPane;

const {
    Footer
} = Layout;

const {TextArea} = Input;

const routes = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        path: 'course/1',
        breadcrumbName: 'Course',
    },
    {
        path: 'lesson/1',
        breadcrumbName: 'Lesson',
    },
];

export interface Props {
    match: any;
    params: any;
    lesson: LessonEntity;
    props: any,
    api: ApiEntity;

    fetchLesson(parameters): void;

    createExercise(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
}

export class LessonDetail extends React.Component<Props, State, {}> {
    public showModal = () => {
        this.setState({
            visible: true
        });
    };
    public closeModal = () => {
        this.setState({
            visible: false
        });
    };
    public handleCancel = (e) => {
        this.closeModal();
    };
    public handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };
    private handleClickCreateQuestion = () => {
        this.showModal();
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentWillMount() {
        this.props.fetchLesson({id: this.props.match.params.id});
    }

    public render() {
        let {lesson, api} = this.props;
        let {match: {params}} = this.props;
        let {visible} = this.state;
        const question_tab = <Fragment><Icon type="question-circle" theme="twoTone"/>Câu hỏi</Fragment>;
        const result_tab = <Fragment><Icon type="info-circle" theme="twoTone"/>Kết quả</Fragment>;
        const comment_tab = <Fragment><Icon type="book" theme="twoTone"/>Bình luận</Fragment>;
        const statistic_studycase = <Fragment><Icon type="reconciliation" theme="twoTone" twoToneColor="#eb2f96"
                                                    className="mr-2"/>Thống
            kê Bài tập</Fragment>;
        const statistic_skill = <Fragment><Icon type="thunderbolt" theme="twoTone" twoToneColor="#eb2f96"
                                                className="mr-2"/>Thống kê kỹ
            năng</Fragment>;
        const basic_info = <Fragment><Icon type="profile" theme="twoTone" twoToneColor="#eb2f96" className="mr-2"/>Thông
            tin
            chung</Fragment>;
        const question_info = <Fragment><Icon type="question-circle" theme="twoTone" twoToneColor="#eb2f96"/>Câu
            hỏi</Fragment>;
        return (
            <Fragment>
                <Helmet title={"Lesson"}/>
                <NavigationBarContainter/>
                {/*-------------------------page header-------------------------*/}
                <PageHeader
                    className="page-header-custom mt-5"
                    title=""
                    breadcrumb={{routes}}
                />
                <div className="pr-5 pl-5">
                    <div className="row lesson-list-header">Danh sach cau hoi cung cap voi cau hoi nay</div>
                    <div className="row">
                        <Tabs defaultActiveKey="1" className="lesson-content w-100">
                            <TabPane tab={question_tab} key="1">
                                <div className="row">
                                    <div className="col-md-5">
                                        <Card
                                            className="lesson-detail-card"
                                            title={statistic_studycase}
                                            headStyle={{borderLeft: '2px solid #1890ff'}}
                                        >
                                            <p>Card content</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
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
                    </div>
                    <div className="row">
                        <Card
                            className="lesson-detail-card w-100 mt-4"
                            title={question_info}
                            headStyle={{borderLeft: '2px solid #1890ff'}}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </div>
                </div>
                <div className="row">a</div>
                <div className="row">a</div>
                {api.loadings > 0 ? <Loader/> : ""}
                <div className="row course_info_layout">
                    <div className="col-md-6">
                        <img className="OMC avatarCourse"
                             alt={lesson ? lesson.name : ""}
                             src={lesson ? lesson.avatar : ""}/>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="row">
                            <div className="col">
                                <p>{lesson ? lesson.name : "Không có dữ liệu để hiện thị"}</p>
                                <p>Level: {lesson ? lesson.level : "Không có dữ liệu để hiện thị"}</p>
                                <p>{lesson ? lesson.short_description : "Không có dữ liệu để hiện thị"}</p>
                            </div>
                            <div className="col">
                                <Button type="primary" className="add_item_button" icon="plus"
                                        onClick={this.handleClickCreateQuestion}>
                                    Tạo câu hỏi
                                </Button>
                                <Button className="item_button">
                                    <Icon type="upload"/>Tạo từ file
                                </Button>
                            </div>
                        </div>
                        <ExerciseModal
                            closeModal={this.closeModal}
                            showModal={this.showModal}
                            visible={visible}
                            title={"Tạo câu hỏi"}
                            createExercise={this.props.createExercise}
                            topic_id={this.props.match.params.id}
                        />
                    </div>
                    <div className="">
                        <ListExerciseContainter children={params}/>
                    </div>
                </div>
                <Footer style={{textAlign: 'center'}}>
                    Easy Japanese Design ©2019 Created by HEDSPI
                </Footer>
                <BackTop/>
            </Fragment>
        );
    }
}
