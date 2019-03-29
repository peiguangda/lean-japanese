import * as React from "react";
import {Fragment} from "react";
import {Question} from "./Question";

export interface Props {
    numberQuestion: number;

    removeQuestion(): void;
}

export interface State {
}

export class ListQuestion extends React.Component<Props, State, {}> {
    public showListQuestion = () => {
        let {numberQuestion} = this.props;
        let result = [];
        if (numberQuestion)
            for (var i = 0; i < numberQuestion; i++)
                result.push(<Question removeQuestion={this.props.removeQuestion} num={i + 1}/>);
        return result;
    }

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
