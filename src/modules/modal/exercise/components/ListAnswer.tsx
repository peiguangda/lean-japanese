import * as React from "react";
import {Fragment} from "react";
import {Answer} from './Answer';

export interface Props {
    addAnswer(): void;
    deleteAnswer(): void;
    number: number;
}

export interface State {
}

export class ListAnswer extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public showListAnswer = () => {
        let {number} = this.props;
        let result = [];
        if (number)
            for (var i = 0; i < number; i++) {
                result.push(<Answer
                                addAnswer={this.props.addAnswer}
                                deleteAnswer={this.props.deleteAnswer}
                            />)
            }
        return result;
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
