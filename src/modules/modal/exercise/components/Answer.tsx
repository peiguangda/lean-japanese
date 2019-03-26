import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";
import {ExercisePopupListItem} from './ExercisePopupListItem';

export interface Props {
}

export interface State {
}

export class Answer extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        const content = <ExercisePopupListItem />
        const suffixQuestion =<Popover content={content} title="Mở rộng" trigger="hover"><Icon type="ordered-list"/></Popover>

        return (
            <Fragment>
                <Input 
                    className="input-question mt-4"
                    suffix={suffixQuestion}
                    size="large"
                />
            </Fragment>
        );
    }
}
