import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";

export interface Props {
    addAnswer(): void;
}

export interface State {
}

export class ExercisePopupListItem extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public handleAddInputRow = (e) => {
        console.log("eeee");
        this.props.addAnswer();
    }

    public render() {
        return (
            <Fragment>
                <div className="col">
                    <Button className="row w-100" type="dashed" onClick={this.handleAddInputRow}>Add Answer</Button>
                    <Button className="row w-100" type="dashed">Set đáp án đúng</Button>
                </div>
            </Fragment>
        );
    }
}
