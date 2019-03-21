import * as React from "react";
import {Helmet} from "react-helmet";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {Modal, Button, Icon, Input} from 'antd';
import {ListExerciseContainter} from './exercise/container';
import {Fragment} from "react";

const {TextArea} = Input;

export interface Props {
}

export interface State {
    visible: boolean;
    title: Array<string>
}

export class LessonDetail extends React.Component<Props, State, {}> {
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
            <Fragment>
                <NavigationBar/>
                <div className="container">
                    <Helmet title={"Lesson"}/>
                    <div>
                        <div className="row home_layout">
                            <div className="col-md-6">
                                <img className="OMC avatarCourse"
                                     src="https://storage.googleapis.com/kslearning/images/722984834-1544915140774-47089101_564216997360595_2408262560290701312_n.jpg"/>
                            </div>
                            <div className="col-md-6 mt-4">
                                <div className="row">
                                    <div className="col">
                                        <p>Lesson 1</p>
                                        <p>Lesson 1</p>
                                        <p>Lesson 1</p>
                                    </div>
                                    <div className="col">
                                        <Button type="primary" onClick={this.showModal}>
                                            <Icon type="plus"/>
                                            Add a exercise
                                        </Button>
                                        <Modal
                                            title="Add a exercise"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >
                                            <Input placeholder="Exercise name"/>
                                            <TextArea placeholder="Description" rows={4}/>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <ListExerciseContainter/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
