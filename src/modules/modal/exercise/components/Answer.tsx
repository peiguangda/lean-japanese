import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";
import {ExercisePopupListItem} from './ExercisePopupListItem';

export interface Props {
    addAnswer(): void;

    deleteAnswer(): void;
}

export interface State {
}

export class Answer extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public deleteAnswer = () => {
        this.props.deleteAnswer();
    }

    public render() {
        const content = <ExercisePopupListItem addAnswer={this.props.addAnswer}/>
        const suffixQuestion = <Popover content={content} title="Mở rộng" trigger="hover"><Icon
            type="ordered-list"/></Popover>

        return (
            <Fragment>
                <div className="row mt-4">
                    <div className="col-md-10">
                        <Input
                            className="input-question"
                            suffix={suffixQuestion}
                            size="large"
                        />
                    </div>
                    <div className="mt-3 col-md-2">
                        <Icon type="delete" className="" onClick={this.deleteAnswer}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}
