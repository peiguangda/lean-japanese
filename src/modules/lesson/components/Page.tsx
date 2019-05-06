import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Button, Card, Icon, Input, Layout, message, PageHeader, Popover, Tabs, Upload} from 'antd';
import {LessonEntity} from "../../../common/types/lesson";
import {ExerciseEntity} from "../../../common/types/exercise";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {ListExerciseContainer} from "./exercise/container";
import {ExerciseModal} from "../../modal/exercise/components/ExerciseModal";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {ListLessonHeader} from "./ListLessonHeader";
import {LessonDetailTab} from "./LessonDetailTab";
import {CardProgressEntity} from "../../../common/types/card_progress";
// var Excel = require('exceljs');
import * as xlsx from 'xlsx';
import {UserCourseEntity} from "../../../common/types/user_course";

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
    history: any,
    api: ApiEntity;
    listLesson: Array<LessonEntity>;
    listCardProgress: Array<CardProgressEntity>;
    userCourse: UserCourseEntity;

    fetchLesson(parameters): Promise<any>;

    createExercise(parameters): Promise<any>;

    fetchListLesson(parameters): void;

    fetchListCardProgress(parameters): void;

    getUserCourse(parameters): void;

    getProfile(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
    isJustDoExam: boolean;
}

export class Exercise implements ExerciseEntity {
    actionType?: string;
    id: string;
    user_id: number;
    course_id: number;
    topic_id: number;
    order_index: number;
    difficulty_level: number;
    has_child: number;
    parent_id: number;
    status: number;
    code: string;
    shuffle_answer: number;
    front_text: string = "";
    front_image: string = "";
    front_sound: string = "";
    front_hint: string = "";
    back_text: string = "";
    back_image: string = "";
    back_sound: string = "";
    back_hint: string = "";
    list_answer: string[] = [];
    list_correct_answer: number[] = [];

    constructor() {
    }
}

export class LessonDetail extends React.Component<Props, State, {}> {
    public async initLesson(id) {
        let user, lesson;
        user = await this.props.getProfile({});
        this.props.fetchLesson({id: id})
            .then(res => {
                if (res && res.status == "success") {
                    lesson = res.data;
                    this.props.getUserCourse({user_id: user.data.id, course_id: lesson.course_id});
                    this.props.fetchListLesson({course_id: lesson.course_id, parent_id: lesson.parent_id});
                }
            })
    }

    public changeLesson = (id) => {
        this.initLesson(id);
    }
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

    public beforeUpload(file) {
        // console.log(file.type);
        const isXlsx = (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        if (!isXlsx) {
            message.error("You can only upload XLSX file!");
        }
        return isXlsx;
    }

    public handleChange = (info) => {
        if (info.file.status === 'error') {
            var list_exercise = [];
            const reader = new FileReader();
            reader.onload = (evt) => { //evt = on_file_select event
                /* Parse data */
                const bstr = evt.target.result;
                const wb = xlsx.read(bstr, {type: 'binary'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = xlsx.utils.sheet_to_json(ws, {header: 1});
                for (var row in data) {
                    var row_val = data[row];
                    var question: Exercise = new Exercise();
                    var is_question = false;
                    for (var col in row_val) {
                        if (row_val[col] == "" || row_val[col] == "Question")
                            break;
                        if (row_val[col].startsWith('#.')) {
                            question.front_text = row_val[col].slice(2);
                            is_question = true;
                        }
                        else if (row_val[col].startsWith("$."))
                            question.back_text = row_val[col].slice(2);
                        else if (row_val[col].startsWith("$b."))
                            question.back_hint = row_val[col].slice(3);
                        else if (row_val[col].startsWith("#"))
                            question.front_image = row_val[col].slice(1);
                        else if (row_val[col].startsWith("#s."))
                            question.front_sound = row_val[col].slice(3);
                        else
                            question.list_answer.push(row_val[col]);
                    }
                    if (is_question == true) {
                        for (var i = 0; i < question.list_answer.length; i++) {
                            if (question.list_answer[i].startsWith("*.")) {
                                question.list_answer[i] = question.list_answer[i].slice(2);
                                question.list_correct_answer.push(i);
                            }
                        }
                    }
                    if (is_question) {
                        list_exercise.push({...question, topic_id: this.props.match.params.id});
                    }
                }
                /* Update state */
                this.props.createExercise(list_exercise)
                    .then(res => {
                        if (res && res.status == "success") message.success("Tạo bài học từ thành công!");
                        else message.error("Xảy ra lỗi!");
                    });
            };
            reader.readAsBinaryString(info.file.originFileObj);
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isJustDoExam: false
        }
    }

    async componentDidMount() {
        let {props} = this.props;
        this.initLesson(this.props.match.params.id);
        this.props.fetchListCardProgress({topic_id: props.match.params.id});
        let isJustDoExam = localStorage.getItem("isJustDoExam");
        if (isJustDoExam) this.setState({
            isJustDoExam: (isJustDoExam == "TRUE")
        })
    }

    public render() {
        let {lesson, api, listLesson, props, listCardProgress, userCourse} = this.props;
        let {match: {params}} = this.props;
        let {visible, isJustDoExam} = this.state;
        console.log("userCourse", userCourse);
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        const question_info = <Fragment><Icon type="question-circle" theme="twoTone" twoToneColor="#eb2f96"/>Câu
            hỏi</Fragment>;
        const question_info_button = <Fragment>
            <Upload
                className=" p-1 m-1"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                <Button>
                    <Icon type="upload"/>Tạo từ file
                </Button>
            </Upload>
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
                    <ListLessonHeader listLesson={listLesson} lesson={lesson} changeLesson={this.changeLesson}
                                      history={this.props.props.history}/>
                    <div className="row">
                        {/*-------------------------Lesson detail tab pane-------------------------*/}
                        <LessonDetailTab lesson={lesson} props={props} listCardProgress={listCardProgress}
                                         isJustDoExam={isJustDoExam}/>
                    </div>
                    <div className="row">
                        <Card
                            extra={question_info_button}
                            className="w-100 mt-4"
                            title={question_info}
                            headStyle={{borderLeft: '2px solid #1890ff'}}
                        >
                            <ListExerciseContainer
                                params={props.match.params}
                                location={props.location}
                                route={null}
                                routeParams={null}
                                router={null}
                                routes={null}
                            />
                        </Card>
                    </div>
                </div>
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
