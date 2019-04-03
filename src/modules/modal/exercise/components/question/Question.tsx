import * as React from "react";
import {Fragment} from "react";
import {Icon} from "antd";

export interface Props {
    num: number;
    current_question: number;

    removeQuestion(parameters): void;

    changeQuestion(parameters): void;
}

export interface State {
}

export class Question extends React.Component<Props, State, {}> {
    public removeQuestion = (parameters) => {
        this.props.removeQuestion(parameters);
    }
    public changeQuestion = (parameters) => {
        this.props.changeQuestion(parameters);
    }

    constructor(props) {
        super(props);
    }

    public render() {
        let {num, current_question} = this.props;
        return (
            <Fragment>
                <div className={`row question-block ${current_question + 1 == num ? "seleted" : ""}`}>
                    <p className={`mt-1 col-md-9`}
                       onClick={() => this.changeQuestion(num)}>Question {num}</p>
                    <Icon className="mt-2 col-md-2 question-close-icon" type="close"
                          onClick={() => this.removeQuestion(num)}/>
                </div>
            </Fragment>
        );
    }
}
