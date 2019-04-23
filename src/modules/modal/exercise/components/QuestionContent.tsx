import * as React from "react";
import {Fragment} from "react";
import {Checkbox, Layout} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListAnswer} from "./answer/ListAnswer";
import {ButtonCustom} from "./common/ButtonCustom";

const {
    Content,
} = Layout;

export interface Props {
    isShowSetting: boolean;
    visible: boolean;
    exercise: ExerciseEntity;
    current_question: number;
    topic_id: number;

    onchangeSetting(): void;

    onUpdateExercise(parameters): void;
}

export interface State {
}

const initialState = {};

export class QuestionContent extends React.Component<Props, State, {}> {
    public addAnswer = (exercise) => {
        let {list_answer} = exercise;
        if (!list_answer) list_answer = []; //check list_answer ko ton tai thi khoi tao no
        list_answer.push("");
        exercise.list_answer = list_answer;
        this.updateExercise({exercise: exercise, current_question: this.props.current_question});
    };
    public deleteAnswer = (parameters) => {
        let {exercise} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        if (list_correct_answer) list_correct_answer = list_correct_answer.filter((item) => {
            return item !== parameters
        });
        list_answer.splice(parameters, 1);
        exercise.list_answer = list_answer;
        exercise.list_correct_answer = list_correct_answer;
        this.updateExercise({exercise: exercise, current_question: this.props.current_question});
    };
    public updateExercise = (parameters) => {
        this.props.onUpdateExercise(parameters);
    };
    public onChangeStatus = (e, exercise) => {
        exercise.shuffle_answer = e.target.checked ? 1 : 0;
        this.updateExercise({exercise: exercise, current_question: this.props.current_question});
    };
    public changeAnswerStatus = (parameters) => {
        let {exercise} = this.props;
        let {index, correct, value} = parameters;
        let {list_correct_answer} = exercise;
        //dung thanh sai
        if (correct) {
            //xoa phan tu khoi list cau tra loi dung
            list_correct_answer = list_correct_answer.filter((item) => {
                return item !== index
            })
        } else {
            // sai thanh dung, can phai xet xem list da ton tai chua, neu chua thi phai khoi tao
            if (!list_correct_answer) list_correct_answer = [];
            //them phan tu vao list cau hoi dung
            list_correct_answer.push(index);
        }
        exercise.list_correct_answer = list_correct_answer;
        this.updateExercise({exercise: exercise, current_question: this.props.current_question});
    };
    public onChangeExercise = (exercise) => {
        this.updateExercise({exercise: exercise, current_question: this.props.current_question});
    };

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    public render() {
        let {exercise} = this.props;
        let {list_answer} = exercise;
        return (
            <Fragment>
                <Content>
                    <div className="row question-content">
                        {/*----------------question--------------------*/}
                        <div className="col-md-5 ml-2">
                            <div className="row">
                                <ButtonCustom
                                    current_added_answer={null}
                                    removeAnswer={null}
                                    addAnswer={null}
                                    title={"Câu hỏi"}
                                    type={"question"}
                                    correct={true}
                                    changeAnswerStatus={this.changeAnswerStatus}
                                    exercise={exercise}
                                    onChangeExercise={this.onChangeExercise}
                                />
                            </div>
                            <div className="row">
                                <ButtonCustom
                                    current_added_answer={null}
                                    removeAnswer={null}
                                    addAnswer={null}
                                    title={"Url sound"}
                                    type={"sound_url_question"}
                                    correct={true}
                                    changeAnswerStatus={this.changeAnswerStatus}
                                    exercise={exercise}
                                    onChangeExercise={this.onChangeExercise}
                                />
                            </div>
                            {/*setting*/}
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <p className="setting-title">Cài đặt câu hỏi</p>
                                    <QuestionTypeSetting
                                        visible={this.props.isShowSetting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <p className="setting-title">Cài đặt khác</p>
                                    <Checkbox
                                        checked={exercise.shuffle_answer ? true : false}
                                        onChange={(checkbox) => this.onChangeStatus(checkbox, exercise)}
                                    >Đảo đáp án
                                    </Checkbox>
                                </div>
                            </div>
                        </div>

                        {/*----------------answer--------------------*/}
                        <div className="col-md-5 ml-2">
                            <div className="row">
                                <ButtonCustom
                                    current_added_answer={null}
                                    removeAnswer={null}
                                    addAnswer={() => this.addAnswer(exercise)}
                                    title={"Đáp án đúng"}
                                    type={"answer"}
                                    correct={true}
                                    changeAnswerStatus={this.changeAnswerStatus}
                                    exercise={exercise}
                                    onChangeExercise={this.onChangeExercise}
                                />
                            </div>
                            <div className="row">
                                <ButtonCustom
                                    current_added_answer={null}
                                    removeAnswer={null}
                                    addAnswer={null}
                                    title={"Url sound"}
                                    type={"sound_url_answer"}
                                    correct={true}
                                    changeAnswerStatus={this.changeAnswerStatus}
                                    exercise={exercise}
                                    onChangeExercise={this.onChangeExercise}
                                />
                            </div>
                            <ListAnswer
                                number={list_answer ? list_answer.length : 0}
                                deleteAnswer={this.deleteAnswer}
                                exercise={exercise}
                                onChangeExercise={this.onChangeExercise}
                                changeAnswerStatus={this.changeAnswerStatus}
                            />
                        </div>
                    </div>
                </Content>
            </Fragment>
        );
    }
}
