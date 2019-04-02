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

    onchangeSetting(): void;

    onUpdateExercise(parameters): void;
}

export interface State {
    exercise: ExerciseEntity;
    numberAnswer: number;
}

const initialState = {
    numberAnswer: 1,
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

export class QuestionContent extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    public handleAddInputRow = (e) => {
        console.log("e", e);
    }
    public onchangeSetting = () => {
        this.props.onchangeSetting();
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

    public updateExercise = (parameters) => {
        this.props.onUpdateExercise(parameters);
    }

    public onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState(prevState => ({
            exercise: {
                ...prevState.exercise,
                shuffle_anser: e.target.checked == true ? 1 : 0
            }
        }))
        this.updateExercise({exercise: this.state.exercise, current_question: this.props.current_question});
    }

    public changeAnswerStatus = () => {
        console.log("thay doi trang thai answer");
    }

    public onChangeExercise = (exercise) => {
        console.log("bbbbbbb", exercise);
        console.log("cccccccc", this.state.exercise);
        this.setState({
            exercise: exercise
        })
        this.updateExercise({exercise: exercise, current_question: this.props.current_question});
    }

    public render() {
        let {exercise} = this.state;
        // let {exercise} = this.props;
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
                                    <Checkbox
                                        onChange={this.onChange.bind(this)}
                                    >Đảo đáp án
                                    </Checkbox>
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
                                    number={this.state.numberAnswer}
                                    addAnswer={this.addAnswer}
                                    deleteAnswer={this.deleteAnswer}
                                    exercise={exercise}
                                    onChangeExercise={this.onChangeExercise}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </Fragment>
        );
    }
}
