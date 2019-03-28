import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";
import {ButtonCustom} from "../common/ButtonCustom";
import {ExerciseEntity} from "../../../../../common/types/exercise";

const {TextArea} = Input;

export interface Props {
    addAnswer(): void;

    deleteAnswer(): void;
    title: string;
    type: string;
    correct: boolean;
    exercise: ExerciseEntity;
}

export interface State {
}

export class Answer extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public deleteAnswer = () => {
        this.props.deleteAnswer();
    }

    public changeAnswerStatus = () => {
        console.log("thay doi trang thai answer")
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
                    />
                </div>
            </Fragment>
        );
    }
}
