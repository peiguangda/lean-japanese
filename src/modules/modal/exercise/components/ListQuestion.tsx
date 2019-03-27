import * as React from "react";
import {Fragment} from "react";
import {Question} from "./Question";

export interface Props {
    removeQuestion(): void;

    numberQuestion: number;
}

export interface State {
}

export class ListQuestion extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public showListQuestion = () => {
        let {numberQuestion} = this.props;
        let result = [];
        if (numberQuestion)
            for (var i = 0; i < numberQuestion; i++)
                result.push(<Question removeQuestion={this.props.removeQuestion} num={i + 1}/>);
        return result;
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
