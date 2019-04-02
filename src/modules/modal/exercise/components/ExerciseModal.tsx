import * as React from "react";
import {Fragment} from "react";
import {Button, Card, Layout, Modal} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListQuestion} from "./question/ListQuestion";
import {QuestionContent} from "./QuestionContent";
import {Exercise} from "../../../lesson/components/exercise/components/Exercise";

const {
    Sider,
} = Layout;

export interface Props {
    title: string;
    visible: boolean;

    closeModal(): void;

    showModal(): void;
}

export interface State {
    exercise: Array<ExerciseEntity>;
    isShowSetting: boolean;
    numberQuestion: number;
    current_question: number;
}

export class ExerciseModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            current_question: 0,
            numberQuestion: 1,
            isShowSetting: false,
            exercise: []
        }
    }

    public showModal = () => {
        this.props.showModal();
    }
    public handleCancel = (e) => {
        console.log("cancel");
        this.props.closeModal();
    }
    public handleOk = (e) => {
        console.log("ok man!");
        this.props.closeModal();
    }
    public onchangeSetting = () => {
        let {isShowSetting} = this.state;
        this.setState({
            isShowSetting: !isShowSetting
        })
    }
    public addQuestion = () => {
        let {numberQuestion} = this.state;
        this.setState({
            numberQuestion: ++numberQuestion,
        })
    }
    public removeQuestion = (parameters) => {
        console.log("parameters", parameters);
        let index = parameters - 1;
        console.log("remove question");
        let {numberQuestion} = this.state;
        if (numberQuestion)
            this.setState({
                numberQuestion: --numberQuestion
            })
    }

    public changeQuestion = (parameters) => {
        console.log("parameters", parameters);
        let index = parameters - 1;
        console.log("change question");
        let {current_question} = this.state;
        this.setState({
            current_question: index
        })
    }

    public onUpdateExercise = (parameters) => {
        console.log("ex", parameters.exercise);
    }

    public changeAnswerStatus = () => {

    }

    public render() {
        let {numberQuestion, isShowSetting, exercise, current_question} = this.state;
        return (
            <Fragment>
                <Modal
                    className="modal-create-question"
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Layout>
                        {/*----------------question bar--------------------*/}
                        <Sider>
                            <div className="nav_question">
                                <Card title="Tất cả các câu hỏi">
                                    <div className="question_items">
                                        <ListQuestion
                                            removeQuestion={this.removeQuestion}
                                            changeQuestion={this.changeQuestion}
                                            numberQuestion={numberQuestion}
                                            current_question={current_question}
                                        />
                                        <div className="row mt-4">
                                            <Button className="col-md-2" type="dashed" icon="plus"
                                                    onClick={this.addQuestion}></Button>
                                            <Button className="col-md-10" type="ghost" icon="import">Thêm từ thư
                                                viện</Button>
                                        </div>
                                        <Button className="row" type="default" icon="setting"
                                                onClick={this.onchangeSetting}>Cài đặt</Button>
                                    </div>
                                </Card>
                                <div className="question_items">
                                    <p className="setting-title mt-2">Cài đặt tất cả câu hỏi</p>
                                    <QuestionTypeSetting
                                        visible={isShowSetting}
                                    />
                                </div>
                            </div>
                        </Sider>
                        {/*----------------question content--------------------*/}
                        <QuestionContent
                            onchangeSetting={this.onchangeSetting}
                            isShowSetting={isShowSetting}
                            visible={true}
                            exercise={exercise[current_question]}
                            onUpdateExercise={this.onUpdateExercise}
                            current_question={current_question}
                        />
                    </Layout>
                </Modal>
            </Fragment>
        );
    }
}
