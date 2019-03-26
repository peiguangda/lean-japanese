import * as React from "react";
import {Fragment} from "react";
import {Answer} from './Answer';

export interface Props {
}

export interface State {
}

export class ListAnswer extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public showListAnswer = () => {
        return <Answer/>
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
