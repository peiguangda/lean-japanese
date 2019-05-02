import * as React from "react";
import {Fragment} from "react";
import {Button, Card, Layout, message, Modal} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListQuestion} from "./question/ListQuestion";
import {QuestionContent} from "./QuestionContent";

const {
    Sider,
} = Layout;

export interface Props {
    title: string;
    visible: boolean;
    topic_id: number;
    exercise: Array<ExerciseEntity>;
    action: string;

    closeModal(): void;

    showModal(): void;

    createExercise(parameters): Promise<any>;

    editExercise(parameters): void;
}

export interface State {
    exercise: Array<ExerciseEntity>;
    isShowSetting: boolean;
    current_question: number;
}

const initExercise = new class implements ExerciseEntity {
    back_hint: string;
    back_image: string;
    back_sound: string;
    back_text: string;
    code: string;
    course_id: number;
    difficulty_level: number;
    front_hint: string;
    front_image: string;
    front_sound: string;
    front_text: string;
    has_child: number;
    id: string;
    order_index: number;
    parent_id: number;
    shuffle_answer: number;
    status: number;
    topic_id: number;
    user_id: number;
    list_answer: Array<string>;
    list_correct_answer: Array<number>;
};

export class ExerciseModal extends React.Component<Props, State, {}> {
    public showModal = () => {
        this.props.showModal();
    };
    public handleCancel = (e) => {
        this.props.closeModal();
    };
    public handleOk = (e) => {
        let {exercise} = this.state;
        this.props.createExercise(exercise)
            .then(res => {
                if (res && res.status == "success") message.success("Tạo bài học thành công!");
                else message.error("Xảy ra lỗi!");
            });
        this.props.closeModal();
    };
    public onchangeSetting = () => {
        let {isShowSetting} = this.state;
        this.setState({
            isShowSetting: !isShowSetting
        })
    };
    public addQuestion = () => {
        let {exercise} = this.state;
        exercise.push({...initExercise, topic_id: this.props.topic_id});
        this.setState({
            exercise: exercise
        })
    };
    public removeQuestion = (parameters) => {
        let {exercise, current_question} = this.state;
        let index = parameters - 1;
        if (index <= current_question) current_question--;  //neu index can xoa < question hien tai thi can giam index cua question hien tai xuong 1 don vi
        exercise.splice(index, 1);
        this.setState({
            exercise: exercise,
            current_question: current_question
        })
    };
    public changeQuestion = (parameters) => {
        let index = parameters - 1;
        this.setState({
            current_question: index
        })
    };
    public onUpdateExercise = (parameters) => {
        let {current_question, exercise} = parameters;
        this.state.exercise[current_question] = exercise;
        this.forceUpdate()
    };
    public changeAnswerStatus = () => {

    };

    constructor(props) {
        super(props);
        this.state = {
            current_question: 0,
            isShowSetting: false,
            exercise: []
        }
    }

    componentWillMount(): void {
        this.state.exercise.push({...initExercise, topic_id: this.props.topic_id});
    }

    public render() {
        let {isShowSetting, exercise, current_question} = this.state;
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
                                            numberQuestion={exercise.length}
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
                        {
                            exercise && (<QuestionContent
                                onchangeSetting={this.onchangeSetting}
                                isShowSetting={isShowSetting}
                                visible={true}
                                exercise={exercise[current_question]}
                                onUpdateExercise={this.onUpdateExercise}
                                current_question={current_question}
                                topic_id={this.props.topic_id}
                            />)
                        }
                    </Layout>
                </Modal>
            </Fragment>
        );
    }
}

