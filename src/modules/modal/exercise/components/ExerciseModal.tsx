import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListAnswer} from "./ListAnswer";
import {ListQuestion} from "./ListQuestion";
import {QuestionContent} from "./QuestionContent";

const {
    Sider,
} = Layout;

export interface Props {
    closeModal(): void;

    showModal(): void;

    title: string;
    visible: boolean;
}

export interface State {
    exercise: ExerciseEntity;
    isShowSetting: boolean;
    numberAnswer: number;
    numberQuestion: number;
}

export class ExerciseModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            numberAnswer: 1,
            numberQuestion: 1,
            isShowSetting: false,
            exercise: new class implements ExerciseEntity {
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
                shuffle_anser: number;
                front_text: string;
                front_image: string;
                front_sound: string;
                front_hint: string;
                back_text: string;
                back_image: string;
                back_sound: string;
                back_hint: string;
            },
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

    public addAnswer = () => {
        let {numberAnswer} = this.state;
        this.setState({
            numberAnswer: ++numberAnswer
        })
    }

    public deleteAnswer = () => {
        let {numberAnswer} = this.state;
        if (numberAnswer)
            this.setState({
                numberAnswer: --numberAnswer
            })
    }

    public addQuestion = () => {
        let {numberQuestion} = this.state;
        this.setState({
            numberQuestion: ++numberQuestion
        })
    }

    public removeQuestion = () => {
        console.log("remove question");
        let {numberQuestion} = this.state;
        if (numberQuestion)
            this.setState({
                numberQuestion: --numberQuestion
            })
    }

    public render() {
        let {numberQuestion, isShowSetting, numberAnswer, exercise} = this.state;
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
                        <Sider>
                            <div className="nav_question">
                                <Card title="Tất cả các câu hỏi">
                                    <div className="question_items">
                                        <ListQuestion
                                            removeQuestion={this.removeQuestion}
                                            numberQuestion={numberQuestion}
                                        />
                                        <div className="row">
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
                        <QuestionContent
                            onchangeSetting={this.onchangeSetting}
                            addAnswer={this.addAnswer}
                            deleteAnswer={this.deleteAnswer}
                            isShowSetting={isShowSetting}
                            numberAnswer={numberAnswer}
                            visible={true}
                        />
                    </Layout>
                </Modal>
            </Fragment>
        );
    }
}
