import {Button, Input, Popover} from "antd";
import * as React from "react";
import {Fragment} from "react";
import {ExerciseEntity} from "../../../../../common/types/exercise";

const {TextArea} = Input;

export interface Props {
    title: string;
    type: string; //question, answer, added_answer, sound_url_question, sound_url_answer
    correct: boolean;
    exercise: ExerciseEntity;
    current_added_answer: number;

    removeAnswer(parameters): void;

    addAnswer(): void;

    changeAnswerStatus(parameters): void;

    onChangeExercise(parameters): void;
}

export interface State {
    text: string;
}

export class ButtonCustom extends React.Component<Props, State, {}> {
    public addAnswer = () => {
        this.props.addAnswer();
    }
    public removeAnswer = (parameters) => {
        this.props.removeAnswer(parameters);
    }
    public changeAnswerStatus = (parameters) => {
        this.props.changeAnswerStatus(parameters);
    }
    public showPopup = (current_added_answer, text) => {
        let {correct, type} = this.props;
        let contentAnswer;
        if (type && (type == "sound_url_question" || type == "sound_url_answer")) return null;
        else if (type == "question")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm ảnh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm âm thanh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm gợi ý</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Định dạng nội dung</Button>
            </div>
        else if (type == "added_answer")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed"
                        onClick={() => this.changeAnswerStatus({
                            index: current_added_answer,
                            correct: correct,
                            value: text
                        })}>Set đáp
                    án {correct ? "sai" : "đúng"}</Button>
            </div>
        else if (type == "answer")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed" onClick={this.addAnswer}>Thêm đáp
                    án</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm ảnh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm âm thanh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm giải thích</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Định dạng nội dung</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Set đáp án sai</Button>
            </div>
        else return null;
        return <Popover content={contentAnswer} title="Mở rộng" trigger="hover"><Button
            icon="ordered-list"
            className="ant-btn create-ex-fix-btn ant-btn-icon-only col-md-1"/></Popover>
    }
    public onChangeExercise = (exercise) => {
        console.log("aaaaaaa", exercise);
        this.props.onChangeExercise(exercise);
    }
    public onChangeText = (e) => {
        let {type, exercise, current_added_answer} = this.props;
        let {value} = e.target;
        this.setState({
            text: value
        })
        if (type && type == "sound_url_question") {
            exercise.front_sound = value;
        }
        if (type && type == "sound_url_answer") {
            exercise.back_sound = value;
        }
        if (type == "question") exercise.front_text = value;
        if (type == "added_answer") exercise.list_answer[current_added_answer] = value;
        if (type == "answer") exercise.back_text = value;
        this.onChangeExercise(exercise);
    }

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        let {type, exercise, current_added_answer} = nextProps;
        let value;
        if (type && type == "sound_url_question") {
            value = exercise.front_sound;
        }
        if (type && type == "sound_url_answer") {
            value = exercise.back_sound;
        }
        if (type == "question") value = exercise.front_text;
        if (type == "added_answer") value = exercise.list_answer[current_added_answer];
        if (type == "answer") value = exercise.back_text;
        this.setState({
            text: value
        })
    }

    public render() {
        let {title, type, correct, exercise, current_added_answer} = this.props;
        let {text} = this.state;
        // console.log("ex", exercise);
        return (
            <Fragment>
                <p className="title-custom w-100">{title}</p>
                <div className={`w-100 ml-2 mr-2 row border-create-question  ${correct ? '' : 'in_correct'}`}>
                    <TextArea
                        className="input-question col-md-11 resize_none_text_area"
                        autosize={{minRows: 2, maxRows: 6}}
                        value={text}
                        onChange={this.onChangeText.bind(this)}
                    />
                    {this.showPopup(current_added_answer, text)}
                    {type == "added_answer" ?
                        <Button icon="close" className="button-close"
                                onClick={() => this.removeAnswer(current_added_answer)}/> : ""}
                </div>
            </Fragment>
        );
    }
}

