import * as React from "react";
import {Fragment} from "react";
import {Layout, Popover, Button, Icon, Input, Card, Checkbox} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListAnswer} from "./answer/ListAnswer";
import {ButtonCustom} from "./common/ButtonCustom";

const {
    Content,
} = Layout;

export interface Props {
    onchangeSetting(): void;

    addAnswer(): void;

    deleteAnswer(): void;

    isShowSetting: boolean;
    numberAnswer: number;
    visible: boolean;
}

export interface State {
    exercise: ExerciseEntity;
}

export class QuestionContent extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            exercise: new class implements ExerciseEntity {
                id: string;
                user_id: number;  //người tạo card
                course_id: number;
                topic_id: number;
                order_index: number;
                difficulty_level: number;
                has_child: number; //có con ko(áp dụng câu hỏi đoạn văn)
                parent_id: number;  //topic id
                status: number;
                code: string;
                shuffle_anser: number; //settting đáp án có đảo hay ko
                front_text: string;     //cau hoi
                front_image: string;     //ảnh câu hỏi
                front_sound: string;      //âm thanh câu hỏi
                front_hint: string;      //gợi ý cho câu hỏi
                back_text: string;      //đáp án
                back_image: string;     //ảnh đáp án
                back_sound: string;     //âm thành đáp án
                back_hint: string;      //gợi ý đáp án
                // danh sách đáp án dạng multichoices,
                // danh sách đáp án dạng câu hỏi nhiều đáp án đúng,
                // nếu hasChild khác null thì có list các child con,
                // setting dạng câu hỏi : chọn đáp án, điền từ, lật mặt, phát âm
            },
        }
    }

    public handleAddInputRow = (e) => {
        console.log("e", e);
    }

    public onchangeSetting = () => {
        this.props.onchangeSetting();
    }

    public addAnswer = () => {
        this.props.addAnswer();
    }

    public deleteAnswer = () => {
        this.props.deleteAnswer();
    }

    public onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    public changeAnswerStatus = () => {
        console.log("thay doi trang thai answer");
    }

    public onChangeExercise = (exercise) => {
        console.log("bbbbbbb",exercise);
        console.log("cccccccc",this.state.exercise);
        this.setState({
            exercise: exercise
        })
    }

    public render() {
        let {exercise} = this.state;
        return (
            <Fragment>
                <Content>
                    <div className="row question-content">
                        {/*----------------question--------------------*/}
                        <div className="col-md-5 ml-2">
                            <div className="row">
                                <ButtonCustom
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
                                    removeAnswer={null}
                                    addAnswer={null}
                                    title={"Url sound"}
                                    type={"sound_url"}
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
                                    <Checkbox onChange={() => this.onChange}>Đảo đáp án</Checkbox>
                                </div>
                            </div>
                        </div>

                        {/*----------------answer--------------------*/}
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-10">
                                    <ButtonCustom
                                        removeAnswer={null}
                                        addAnswer={this.addAnswer}
                                        title={"Đáp án đúng"}
                                        type={"answer"}
                                        correct={true}
                                        changeAnswerStatus={this.changeAnswerStatus}
                                        exercise={exercise}
                                        onChangeExercise={this.onChangeExercise}
                                    />
                                </div>
                                <div className="col-md-10">
                                    <ButtonCustom
                                        removeAnswer={null}
                                        addAnswer={null}
                                        title={"Url sound"}
                                        type={"sound_url"}
                                        correct={true}
                                        changeAnswerStatus={this.changeAnswerStatus}
                                        exercise={exercise}
                                        onChangeExercise={this.onChangeExercise}
                                    />
                                </div>
                                <ListAnswer
                                    number={this.props.numberAnswer}
                                    addAnswer={this.addAnswer}
                                    deleteAnswer={this.deleteAnswer}
                                    exercise={exercise}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </Fragment>
        );
    }
}
