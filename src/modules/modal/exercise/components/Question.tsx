import * as React from "react";
import {Fragment} from "react";

export interface Props {
}

export interface State {
}

export class Question extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public render() {

        return (
            <Fragment>
                <p>question 1</p>
            </Fragment>
        );
    }
}
