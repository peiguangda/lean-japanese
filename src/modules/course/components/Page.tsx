import * as React from "react";
import {Helmet} from "react-helmet";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {Modal, Button, Icon, Input, Upload, message} from 'antd';
import {ListLessonContainter} from "./lesson/container";
import {CourseEntity} from "../types";
import { ApiEntity } from '../../../common/types/index';
import {Loader} from "../../loader/components/loader";

const {TextArea} = Input;

export interface Props {
    fetchCourse(parameters): void
    course: CourseEntity;
    match: any;
    params: any;
    api: ApiEntity;
    loading: number;
}

export interface State {
    visible: boolean;
    title: Array<string>
}

export class CourseDetail extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: []
        }
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
        console.log(e);
        this.setState({
            visible: false,
        });
        this.state.title.push("LOL")
    }

    public componentWillMount() {
        // get prams form url
        const { match: { params } } = this.props;
        // get coure detail
        this.props.fetchCourse({id: params.id});
    }

    public render() {
        let {course, api} = this.props;
        return (
            <div className="container">
                <Helmet title={"Course"}/>
                <NavigationBar/>
                <div>
                    {api.loadings > 0 ? <Loader/> : ""}
                    <div className="row">
                        <div className="col-md-6">
                            <img className="OMC avatarCourse"
                                 src="https://storage.googleapis.com/kslearning/images/722984834-1544915140774-47089101_564216997360595_2408262560290701312_n.jpg"/>
                        </div>
                        <div className="col-md-6 mt-4">
                            <div className="row">
                                <div className="col">
                                    <p>{course.name}</p>
                                    <p>Code: {course.code}</p>
                                    <p>{course.short_description}</p>
                                </div>
                                <div className="col">
                                    <Button type="primary" onClick={this.showModal}>
                                        <Icon type="plus"/>
                                        Add a lesson
                                    </Button>
                                    <Modal
                                        title="Add a lesson"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <Input placeholder="Lesson name"/>
                                        <TextArea placeholder="Description" rows={4}/>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <ListLessonContainter/>
                    </div>
                </div>
            </div>
        );
    }
}
