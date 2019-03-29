import * as React from "react";
import {Helmet} from "react-helmet";
import {CourseEntity} from "../../../../../common/types/course";
import {ApiEntity} from "../../../../../common/types";
import {Button, message} from "antd";
import {LessonEntity} from "../../../../../common/types/lesson";
import "../../../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "../../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "../../../../../../node_modules/react-datepicker/dist/react-datepicker.min.css";
import {LessonModal} from "../../../../modal/lesson/components/LessonModal";

export interface Props {
    course: CourseEntity;
    api: ApiEntity;
    loading: number;
    props: any;
    params: any;

    fetchCourse(parameters): void;

    fetchLessons(parameters): void;

    createLesson(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
    loading: boolean;
    lesson: LessonEntity;
    start_time: any;
    end_time: any;
}

export class CourseInfo extends React.Component<Props, State, {}> {
    public _createLesson = params => {
        this.props.createLesson(params)
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchLessons({course_id: params.course_id});
                }
            })
    }
    public onClickCreate = () => {
        this._showModal();
    }
    public _closeModal = () => {
        this.setState({
            visible: false
        })
    }
    public _showModal = () => {
        this.setState({
            visible: true
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            start_time: (new Date()).getDate(),
            end_time: new Date(),
            lesson: new class implements LessonEntity {
                id: string;
                actionType: string;
                avatar: string;
                childrent_type: number;
                course_id: number;
                description: string;
                duration: number;
                end_time: number;
                level: number;
                name: string;
                order_index: number;
                parent_id: number;
                pass: number;
                password: string;
                question_number: number;
                score_scale: number;
                short_description: string;
                sort_id: number;
                start_time: number;
                status: number;
                tag: string;
                time_practice: number;
                total_card_num: number;
                user_id: number;
                user_name: string;
            }
        }
    }

    public componentWillMount() {
        const {params} = this.props;
        this.props.fetchCourse(params); // get course detail
    }

    public render() {
        console.log("cousrse info", this.props);
        let {course} = this.props;
        let {visible, lesson} = this.state;
        return (
            <div className="row course_info_layout">
                <div className="col-md-6">
                    <img className="OMC avatarCourse"
                         alt={course ? course.name : ""}
                         src={course ? course.avatar : ""}/>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="row">
                        <div className="col">
                            <p>{course ? course.name : "Không có dữ liệu để hiện thị"}</p>
                            <p>Code: {course ? course.code : "Không có dữ liệu để hiện thị"}</p>
                            <p>{course ? course.short_description : "Không có dữ liệu để hiện thị"}</p>
                        </div>
                        <div className="col">
                            <Button type="primary" className="item_button" icon="plus" onClick={this.onClickCreate}>
                                Add a lesson
                            </Button>
                            <LessonModal
                                fetchLessons={this.props.fetchLessons}
                                lesson={lesson}
                                handleLesson={this._createLesson}
                                title={"Create a lesson"}
                                visible={visible}
                                course_id={course.id}
                                closeModal={this._closeModal}
                                showModal={this._showModal}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
