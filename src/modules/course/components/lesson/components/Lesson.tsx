import * as React from "react";
import {Button, Card, Popover} from 'antd';
import {Link} from "react-router-dom";
import { Popconfirm, message } from 'antd';

export interface Props {
}

export interface State {
    title: string
}

export class Lesson extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public confirm(e) {
        console.log(e);
        message.success('Click on Yes');
      }
      
    public cancel(e) {
        console.log(e);
        message.error('Click on No');
      }

    public render() {
        return (
            <Card style={{width: 1000}}>
                <div className="row">
                    <div className="col-md-8">
                        <Link to="/lesson/1"><p>{this.props.children}</p></Link>
                    </div>
                    <div className="col-md-4">
                        <Popover placement="bottomRight" title={"title"} content={"content"} trigger="click">
                            <Button type="primary" icon="plus-circle"></Button>
                        </Popover>
                        <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <Button type="default" icon="close"></Button>
                        </Popconfirm>
                    </div>
                </div>
            </Card>
        );
    }
}
