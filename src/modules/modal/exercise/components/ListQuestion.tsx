import * as React from "react";
import {Fragment} from "react";
import {Question} from "./Question";

export interface Props {
}

export interface State {
}

export class ListQuestion extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public showListQuestion = () => {
        return <Question/>
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
