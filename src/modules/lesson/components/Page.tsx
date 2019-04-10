import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Button, Card, Icon, Input, Layout, PageHeader, Popover, Tabs} from 'antd';
import {LessonEntity} from "../../../common/types/lesson";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {ListExerciseContainer} from "./exercise/container";
import {ExerciseModal} from "../../modal/exercise/components/ExerciseModal";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {ListLessonHeader} from "./ListLessonHeader";
import {LessonDetailTab} from "./LessonDetailTab";

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
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        const question_info = <Fragment><Icon type="question-circle" theme="twoTone" twoToneColor="#eb2f96"/>Câu
            hỏi</Fragment>;
        const question_info_button = <Fragment>
            <Icon type="warning" theme="twoTone" twoToneColor="#52c41a" className="button-warning"/>
            <Button className=" p-1 m-1 ml-2" icon="upload">Tạo từ file</Button>
            <Button className=" p-1 m-1" icon="plus" onClick={this.handleClickCreateQuestion}>Tạo câu hỏi</Button>
            <Button className=" p-1 m-1">Sửa tất cả</Button>
            <Popover placement="bottomRight" content={content} trigger="click">
                <Button icon="ordered-list" type="dashed"/>
            </Popover>
        </Fragment>
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
                    {/*-------------------------list lesson cùng cấp-------------------------*/}
                    <ListLessonHeader/>
                    <div className="row">
                        {/*-------------------------Lesson detail tab pane-------------------------*/}
                        <LessonDetailTab/>
                    </div>
                    <div className="row">
                        <Card
                            extra={question_info_button}
                            className="lesson-detail-card w-100 mt-4"
                            title={question_info}
                            headStyle={{borderLeft: '2px solid #1890ff'}}
                        >
                            <ListExerciseContainer children={params}/>
                        </Card>
                    </div>
                </div>
                <div className="row">a</div>
                <div className="row">a</div>
                {api.loadings > 0 ? <Loader/> : ""}
                <ExerciseModal
                    closeModal={this.closeModal}
                    showModal={this.showModal}
                    visible={visible}
                    title={"Tạo câu hỏi"}
                    createExercise={this.props.createExercise}
                    action="create"
                    topic_id={this.props.match.params.id}
                    exercise={null}
                    editExercise={null}
                />
                <Footer style={{textAlign: 'center'}}>
                    Easy Japanese Design ©2019 Created by HEDSPI
                </Footer>
                <BackTop/>
            </Fragment>
        );
    }
}
