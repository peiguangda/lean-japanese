import * as React from "react";
import {Fragment} from "react";
import {Input} from "antd";
import {ButtonCustom} from "../common/ButtonCustom";
import {ExerciseEntity} from "../../../../../common/types/exercise";

const {TextArea} = Input;

export interface Props {
    title: string;
    type: string;
    correct: boolean;
    exercise: ExerciseEntity;
    current_added_answer: number;

    deleteAnswer(parameters): void;

    onChangeExercise(parameters): void;

    changeAnswerStatus(parameters): void;
}

export interface State {
}

export class Answer extends React.Component<Props, State, {}> {
    public deleteAnswer = (parameters) => {
        this.props.deleteAnswer(parameters);
    };
    public changeAnswerStatus = () => {
        console.log("thay doi trang thai answer")
    };

    constructor(props) {
        super(props);
    }

    public render() {
        let {title, type, correct, exercise, current_added_answer} = this.props;
        return (
            <Fragment>
                {/*<div className="col-md-10">*/}
                    <div className="row">
                        <ButtonCustom
                            current_added_answer={current_added_answer}
                            removeAnswer={this.deleteAnswer}
                            addAnswer={null}
                            title={title}
                            type={type}
                            correct={correct}
                            changeAnswerStatus={this.props.changeAnswerStatus}
                            exercise={exercise}
                            onChangeExercise={this.props.onChangeExercise}
                        />
                    </div>
                {/*</div>*/}
            </Fragment>
        );
    }
}
