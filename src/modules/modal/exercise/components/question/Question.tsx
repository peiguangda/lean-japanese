import * as React from "react";
import {Fragment} from "react";
import {Icon} from "antd";

export interface Props {
    num: number;

    removeQuestion(): void;
}

export interface State {
}

export class Question extends React.Component<Props, State, {}> {
    public removeQuestion = () => {
        this.props.removeQuestion();
    }

    constructor(props) {
        super(props);
    }

    public render() {
        let {num} = this.props;
        return (
            <Fragment>
                <div className="row">
                    <p className="mt-1 col-md-10">Question {num}</p>
                    <Icon className="mt-1 col-md-2" type="close" onClick={this.removeQuestion}/>
                </div>
            </Fragment>
        );
    }
}
