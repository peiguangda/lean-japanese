import * as React from "react";
import {Fragment} from "react";
import {Question} from "./Question";

export interface Props {
    numberQuestion: number;
    current_question: number;

    removeQuestion(parameters): void;

    changeQuestion(parameters): void;
}

export interface State {
}

export class ListQuestion extends React.Component<Props, State, {}> {
    public showListQuestion = () => {
        let {numberQuestion, current_question} = this.props;
        let result = [];
        if (numberQuestion)
            for (var i = 0; i < numberQuestion; i++)
                result.push(<Question
                    removeQuestion={this.props.removeQuestion}
                    changeQuestion={this.props.changeQuestion}
                    num={i + 1}
                    current_question={current_question}
                />);
        return result;
    };

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <Fragment>
                {
                    this.showListQuestion()
                }
            </Fragment>
        );
    }
}
