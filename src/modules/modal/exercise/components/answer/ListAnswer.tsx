import * as React from "react";
import {Fragment} from "react";
import {Answer} from './Answer';
import {ExerciseEntity} from "../../../../../common/types/exercise";

export interface Props {
    number: number;
    exercise: ExerciseEntity;

    addAnswer(): void;

    deleteAnswer(): void;

    onChangeExercise(parameters): void;
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
                    addAnswer={this.props.addAnswer}
                    deleteAnswer={this.props.deleteAnswer}
                    correct={false}
                    title={"Đáp án sai"}
                    type={"added_answer"}
                    exercise={exercise}
                    onChangeExercise={this.props.onChangeExercise}
                />)
            }
        return result;
    }

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
