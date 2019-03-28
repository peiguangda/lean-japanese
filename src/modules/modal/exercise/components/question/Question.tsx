import * as React from "react";
import {Fragment} from "react";
import {Icon} from "antd";

export interface Props {
    removeQuestion(): void;

    num: number;
}

export interface State {
}

export class Question extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public removeQuestion = () => {
        this.props.removeQuestion();
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
