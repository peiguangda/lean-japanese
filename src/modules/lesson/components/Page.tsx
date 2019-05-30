import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {
    BackTop,
    Button,
    Card,
    Dropdown,
    Icon,
    Input,
    Layout,
    Menu,
    message,
    Modal,
    PageHeader,
    Popover,
    Tabs,
    Upload
} from 'antd';
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
import {TopicHistoryEntity} from "../../../common/types/topic_history";
import {VideoScenarioEntity} from "../../../common/types/video_scenario";
import {VideoTimeItemEntity} from "../../../common/types/video_time_item";

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

function handleMenuClick(e) {
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">10 câu</Menu.Item>
        <Menu.Item key="2">20 câu</Menu.Item>
        <Menu.Item key="3">30 câu</Menu.Item>
    </Menu>
);

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
    currentUser: any;
    listTopicHistory: Array<TopicHistoryEntity>;
    videoScenario: VideoScenarioEntity;
    listVideoTimeItem: Array<VideoTimeItemEntity>;
    listExercise: ExerciseEntity[];

    fetchListExercise(parameters): void;

    fetchLesson(parameters): Promise<any>;

    createExercise(parameters): Promise<any>;

    fetchListLesson(parameters): void;

    fetchListCardProgress(parameters): void;

    getUserCourse(parameters): void;

    getProfile(parameters): Promise<any>;

    createUserCourse(parameters): Promise<any>;

    createTopicHistory(parameters): Promise<any>;

    fetchTopicHistory(parameters): void;

    fetchVideoScenario(parameters): void;

    createVideoScenario(parameters): void;

    fetchListVideoTimeItem(parameters): void;

    createVideoTimeItem(parameters): void;

    updateVideoTimeItem(parameters): void;

    fetchVideoTimeItem(parameters): void;
}

export interface State {
    visible: boolean;
    isJustDoExam: boolean;
    modal1Visible: boolean;
    modal2Visible: boolean;
    modal3Visible: boolean;
    visible_submit_course: boolean;
    admin: boolean;
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
    public handleCancelSubmitCourse = (e) => {
        let {lesson} = this.props;
        this.props.history.push(`/course/${lesson.course_id}`);
        //di chuyen ve trang home
    };
    public handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };
    public handleOkSubmitCourse = (e) => {
        let {lesson} = this.props;
        this.props.createUserCourse({course_id: lesson.course_id})
            .then(res => {
                if (res && res.status == "success") {
                    message.success("Tham gia khóa học, chúc bạn có những bài học tuyệt vời!");
                    this.setState({
                        visible_submit_course: false
                    })
                } else message.error("Xảy ra lỗi khi tham gia khóa học~");
            })
    };
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
                        } else if (row_val[col].startsWith("$."))
                            question.back_text = row_val[col].slice(2);
                        else if (row_val[col].startsWith("$b."))
                            question.back_hint = row_val[col].slice(3);
                        else if (row_val[col].startsWith("#s."))
                            question.front_sound = row_val[col].slice(3);
                        else if (row_val[col].startsWith("#"))
                            question.front_image = row_val[col].slice(1);
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
    public requestLogin = () => {
        let {lesson} = this.props;
        message.info("Hãy đăng nhập để được sử dụng tính năng này!");
        this.props.history.push(`/`);
    }
    public setModal1Visible = (modal1Visible) => {
        this.setState({modal1Visible: modal1Visible});
    }
    public setModal2Visible = (modal2Visible) => {
        this.setState({modal2Visible: modal2Visible});
    }
    public setModal3Visible = (modal3Visible) => {
        this.setState({modal3Visible: modal3Visible});
    }
    private handleClickCreateQuestion = () => {
        this.showModal();
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isJustDoExam: false,
            modal1Visible: false,
            modal2Visible: false,
            visible_submit_course: false,
            admin: this.props.userCourse[0] && this.props.userCourse[0].role_type == 1 ? true : false,
            modal3Visible: false,
        }
    }

    public async initLesson(id) {
        let user, lesson, userCourse;
        user = await this.props.getProfile({});
        this.props.fetchLesson({id: id})
            .then(async res => {
                if (res && res.status == "success") {
                    lesson = res.data;
                    userCourse = await this.props.getUserCourse({user_id: user.data.id, course_id: lesson.course_id});
                    userCourse = userCourse.data;
                    this.setState({
                        visible_submit_course: Object.keys(userCourse).length == 0 ? true : false
                    });
                    this.props.fetchListLesson({course_id: lesson.course_id, parent_id: lesson.parent_id});
                }
            })
    }

    public beforeUpload(file) {
        const isXlsx = (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        if (!isXlsx) {
            message.error("You can only upload XLSX file!");
        }
        return isXlsx;
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({
            admin: nextProps.userCourse[0] && nextProps.userCourse[0].role_type == 1 ? true : false,
        })
    }

    async componentDidMount() {
        let {props, fetchVideoScenario, createVideoScenario, fetchListVideoTimeItem, createVideoTimeItem} = this.props;
        let videoScenario;
        this.initLesson(this.props.match.params.id);
        this.props.fetchTopicHistory({topic_id: props.match.params.id});
        this.props.fetchListCardProgress({topic_id: props.match.params.id});
        let isJustDoExam = localStorage.getItem("isJustDoExam");
        if (isJustDoExam) this.setState({
            isJustDoExam: (isJustDoExam == "TRUE")
        })
        videoScenario = await fetchVideoScenario({topic_id: props.match.params.id});
        if (!videoScenario.data) {
            await createVideoScenario({topic_id: props.match.params.id, video_url: ""});
            videoScenario = await fetchVideoScenario({topic_id: props.match.params.id});
        }
        fetchListVideoTimeItem({video_scenario_id: videoScenario.data.id});
    }

    public render() {
        let {
            lesson, api, listLesson, props, listCardProgress, userCourse, currentUser, listTopicHistory, match, videoScenario,
            listVideoTimeItem, fetchListExercise, listExercise, createVideoTimeItem, updateVideoTimeItem, fetchVideoTimeItem
        } = this.props;
        let {match: {params}} = this.props;
        let {visible, isJustDoExam, admin} = this.state;
        const content = (
            <div>
                <Button type="default" className="JLC" onClick={() => this.setModal2Visible(true)}>Setting</Button>
                <Modal
                    className="set_text"
                    title="Cài Đặt Game"
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    <div>
                        <tr>
                            <td className="col-6">Số câu hỏi cho mỗi lần luyện tập</td>
                            <td className='col-6'>
                                <Dropdown overlay={menu}>
                                    <Button>
                                        Tất cả <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                            </td>
                        </tr>
                    </div>
                </Modal>
                <br></br>
                <Button type="default" className="JLC" onClick={() => this.setModal3Visible(true)}>Xuất câu hỏi</Button>
                <Modal
                    className="set_text"
                    title="Câu Hỏi"
                    visible={this.state.modal3Visible}
                    onOk={() => this.setModal3Visible(false)}
                    onCancel={() => this.setModal3Visible(false)}
                >
                </Modal>
            </div>
        );
        const question_info = <Fragment><Icon type="question-circle" theme="twoTone" twoToneColor="#eb2f96"/>Câu
            hỏi</Fragment>;
        const question_info_button = <Fragment>
            <Button type="dashed" shape="circle" icon="question" onClick={() => this.setModal1Visible(true)}></Button>
            <Modal
                className="set_text"
                title="Các ký hiệu cần nhớ để format."
                visible={this.state.modal1Visible}
                onOk={() => this.setModal1Visible(false)}
                onCancel={() => this.setModal1Visible(false)}
            >
                <div>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">#.</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước mỗi câu hỏi
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">*.</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước mỗi đáp án đúng
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">$.</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước câu ví dụ hoặc giải thích cho câu hỏi
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">$b.</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước giải thích cho đáp án
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">#p.</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước mỗi đoạn paragraph
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">#</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước mỗi hình ảnh
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color">#s.</strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Trước mỗi file sound
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="set_hint">
                        <tbody>
                        <tr>
                            <td className="set_hint_td">
                                <div className="gwt-HTML">
                                    <strong className="set_hint_color"></strong>
                                </div>
                            </td>
                            <td className="set_hint_td_text">
                                <div className="gwt-HTML">
                                    Đáp án sai thì ko có ký tự
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
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
                {currentUser && currentUser.responseError ? this.requestLogin() : ""}
                {/*-------------------------page header-------------------------*/}
                <PageHeader
                    className="page-header-custom mt-5"
                    title=""
                    breadcrumb={{routes}}
                />
                <Modal
                    title="Bạn chưa đăng kí tham gia khóa học"
                    visible={this.state.visible_submit_course}
                    onOk={this.handleOkSubmitCourse}
                    onCancel={this.handleCancelSubmitCourse}
                >
                    <p>Đăng kí tham gia khóa học?</p>
                </Modal>
                <div className="pr-5 pl-5">
                    {/*-------------------------list lesson cùng cấp-------------------------*/}
                    <ListLessonHeader listLesson={listLesson} lesson={lesson} changeLesson={this.changeLesson}
                                      history={this.props.props.history}/>
                    <div className="row">
                        {/*-------------------------Lesson detail tab pane-------------------------*/}
                        <LessonDetailTab lesson={lesson}
                                         props={props}
                                         match={match}
                                         params={params}
                                         admin={admin}
                                         listCardProgress={listCardProgress}
                                         isJustDoExam={isJustDoExam}
                                         listTopicHistory={listTopicHistory}
                                         fetchListExercise={fetchListExercise}
                                         listExercise={listExercise}
                                         createVideoTimeItem={createVideoTimeItem}
                                         videoScenario={videoScenario}
                                         listVideoTimeItem={listVideoTimeItem}
                                         updateVideoTimeItem={updateVideoTimeItem}
                                         fetchVideoTimeItem={fetchVideoTimeItem}
                        />
                    </div>
                    {admin ? <div className="row">
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
                    </div> : ""}
                </div>
                {api.loadings > 0 ? <Loader/> : ""}
                {admin ? <ExerciseModal
                    closeModal={this.closeModal}
                    showModal={this.showModal}
                    visible={visible}
                    title={"Tạo câu hỏi"}
                    createExercise={this.props.createExercise}
                    action="create"
                    topic_id={this.props.match.params.id}
                    exercise={null}
                    editExercise={null}
                /> : ""}
                <Footer style={{textAlign: 'center'}}>
                    Easy Japanese Design ©2019 Created by HEDSPI
                </Footer>
                <BackTop/>
            </Fragment>
        );
    }
}
