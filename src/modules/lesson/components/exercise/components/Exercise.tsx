import * as React from "react";
import {Button, Card, Popover} from 'antd';
import {Link} from "react-router-dom";


export interface Props {
}

export interface State {
    title: string
}

export class Exercise extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className="container">
                <Card style={{width: 1000}}>
                    <div className="row">
                        <div className="col-md-8">
                            <Link to="/"><p>{this.props.children}</p></Link>
                        </div>
                        <div className="col-md-4">
                            <Popover placement="bottomRight" title={"title"} content={"content"} trigger="click">
                                <Button type="primary" icon="plus-circle"></Button>
                            </Popover>
                            <Button type="default" icon="close"></Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
