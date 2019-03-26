import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";

export interface Props {
}

export interface State {
}

export class ExercisePopupListItem extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public handleAddInputRow = (e) => {
        console.log("e", e);
    }

    public render() {
        return (
            <Fragment>
                <div className="col">
                    <Button className="row w-100" type="dashed" onClick={this.handleAddInputRow}>Dashed</Button>
                    <Button className="row w-100" type="dashed">Dashed</Button>
                    <Button className="row w-100" type="dashed">Dashed</Button>
                </div>
            </Fragment>
        );
    }
}
