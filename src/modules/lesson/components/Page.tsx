import * as React from "react";
import {Helmet} from "react-helmet";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {Modal, Button, Icon, Input} from 'antd';
import {Fragment} from "react";
import {LessonEntity} from "../../../common/types/lesson";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {ListExerciseContainter} from "./exercise/container";

const {TextArea} = Input;

export interface Props {
    fetchLesson(parameters): void;

    match: any;
    params: any;
    lesson: LessonEntity;
    api: ApiEntity;
}

export interface State {
    visible: boolean;
}

export class LessonDetail extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentWillMount() {
        this.props.fetchLesson({id: this.props.match.params.id});
    }

    public showModal = () => {
        this.setState({
            visible: true
        });
    }

    public handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    public handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    public render() {
        let {lesson, api} = this.props;
        let {match: {params}} = this.props;
        return (
            <Fragment>
                <NavigationBar/>
                <div className="container">
                    <Helmet title={"Lesson"}/>
                    <div className="home_layout">
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
                                        <Button type="primary" className="add_item_button" icon="plus">
                                            Tạo câu hỏi
                                        </Button>
                                        <Button className="add_item_button">
                                            <Icon type="upload"/>Tạo từ file
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <ListExerciseContainter children={params}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
