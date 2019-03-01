import * as React from "react";
import {Helmet} from "react-helmet";
import "../../../public/css/custom.scss";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {Course} from "./Course";
import {Modal, Button, Icon, Input} from 'antd';
import {ListLessonContainter} from './lesson/container';

const {TextArea} = Input;

export interface Props {
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

    public componentDidMount() {
        // Call api get list data
    }

    public render() {
        return (
            <div className="">
                <Helmet title={"Course"}/>
                <NavigationBar/>
                <div className="row container">
                    <div className="col-md-6">
                        <img className="OMC avatarCourse"
                             src="https://storage.googleapis.com/kslearning/images/722984834-1544915140774-47089101_564216997360595_2408262560290701312_n.jpg"/>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="row">
                            <div className="col">
                                <p>Khóa học tiếng nhật N3</p>
                                <p>Khóa học tiếng nhật N3</p>
                                <p>Khóa học tiếng nhật N3</p>
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
                <div className="row">
                    <ListLessonContainter/>
                </div>
            </div>
        );
    }
}
