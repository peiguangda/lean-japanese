import * as React from "react";
import {Fragment} from "react";
import {Answer} from './Answer';
import {ExerciseEntity} from "../../../../../common/types/exercise";

export interface Props {
    number: number;
    exercise: ExerciseEntity;

    deleteAnswer(parameters): void;

    onChangeExercise(parameters): void;

    changeAnswerStatus(parameters): void;
}

export interface State {
}

export class ListAnswer extends React.Component<Props, State, {}> {
    //show list dap an khi dc them vao, mac dinh la dap an sai
    public showListAnswer = () => {
        let {number, exercise} = this.props;
        let result = [];
        if (number)
            for (var i = 0; i < number; i++) {
                result.push(<Answer
                    current_added_answer={i}
                    deleteAnswer={this.props.deleteAnswer}
                    correct={(exercise && exercise.list_correct_answer && exercise.list_correct_answer.indexOf(i) > -1) ? true : false}
                    title={(exercise && exercise.list_correct_answer && exercise.list_correct_answer.indexOf(i) > -1) ? "Đáp án đúng" : "Đáp án sai"}
                    type={"added_answer"}
                    exercise={exercise}
                    onChangeExercise={this.props.onChangeExercise}
                    changeAnswerStatus={this.props.changeAnswerStatus}
                />)
            }
        return result;
    };

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <Fragment>
                {
                    this.showListAnswer()
                }
            </Fragment>
        );
    }
}
