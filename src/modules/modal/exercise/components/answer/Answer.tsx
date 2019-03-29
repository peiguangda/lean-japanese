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

    addAnswer(): void;

    deleteAnswer(): void;

    onChangeExercise(parameters): void;
}

export interface State {
}

export class Answer extends React.Component<Props, State, {}> {
    public deleteAnswer = () => {
        this.props.deleteAnswer();
    }
    public changeAnswerStatus = () => {
        console.log("thay doi trang thai answer")
    }

    constructor(props) {
        super(props);
    }

    public render() {
        let {title, type, correct, exercise} = this.props;
        return (
            <Fragment>
                <div className="col-md-10">
                    <ButtonCustom
                        removeAnswer={this.deleteAnswer}
                        addAnswer={null}
                        title={title}
                        type={type}
                        correct={correct}
                        changeAnswerStatus={this.changeAnswerStatus}
                        exercise={exercise}
                        onChangeExercise={this.props.onChangeExercise}
                    />
                </div>
            </Fragment>
        );
    }
}
