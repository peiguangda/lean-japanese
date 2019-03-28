import {Button, Input, Popover} from "antd";
import * as React from "react";
import {Fragment} from "react";
import {ExerciseEntity} from "../../../../../common/types/exercise";

const {TextArea} = Input;

export interface Props {
    removeAnswer(): void;

    addAnswer(): void;

    changeAnswerStatus(): void;

    onChangeExercise(parameters): void;

    title: string;
    type: string; //question, answer, added_answer, sound_url
    correct: boolean;
    exercise: ExerciseEntity;
}

export interface State {
    text: string;
}

export class ButtonCustom extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    public addAnswer = () => {
        this.props.addAnswer();
    }

    public removeAnswer = () => {
        this.props.removeAnswer();
    }

    public changeAnswerStatus = () => {
        this.props.changeAnswerStatus();
    }

    public showPopup = () => {
        let {correct, type} = this.props;
        let contentAnswer
        if (type && type == "sound_url") return null;
        else if (type == "question")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm ảnh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm âm thanh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm gợi ý</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Định dạng nội dung</Button>
            </div>
        else if (type == "added_answer")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed" onClick={this.changeAnswerStatus}>Set đáp
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
        console.log("aaaaaaa",exercise);
        this.props.onChangeExercise(exercise);
    }

    public onChangeText = (e) => {
        let {type, exercise} = this.props;
        let {value} = e.target;
        this.setState({
            text: value
        })
        if (type && type == "sound_url") {
            exercise.front_sound = value;
            exercise.back_sound = value;
        }
        if (type == "question") exercise.front_text = value;
        // if (type == "added_answer")  can them list answer
        if (type == "answer") exercise.back_text = value;
        this.onChangeExercise(exercise);
    }

    public render() {
        let {title, type, correct, exercise} = this.props;
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
                    {this.showPopup()}
                    {type == "added_answer" ?
                        <Button icon="close" className="button-close" onClick={this.removeAnswer}/> : ""}
                </div>
            </Fragment>
        );
    }
}

