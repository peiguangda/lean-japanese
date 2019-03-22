import * as React from "react";
import {Button, Card, Popover} from 'antd';
import {Link} from "react-router-dom";
import { Popconfirm, message, Icon } from 'antd';
import {LessonEntity} from "../types";

export interface Props {
    lesson: LessonEntity;
    deleteLesson(parameters): void;
    course_id: number;
}

export interface State {
    title: string
}

export class Lesson extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public confirm(params) {
        this.props.deleteLesson(params);
      }
      
    public cancel(e) {
        console.log(e);
        message.error('Click on No');
    }

    public onClickEdit = event => {
        console.log("event", event);
    }

    public render() {
        let {lesson} = this.props;
        return (
            <Card style={{width: 1000}}>
                <div className="row">
                    <div className="col-md-8">
                        <Link to={lesson ? `/lesson/${lesson.id}` : '/'}><p>{lesson ? lesson.name : ""}</p></Link>
                        <div className="row">
                            <p className="col-md-10">{lesson.short_description}</p>
                            <Icon type="eye" className="viewer className="col-md-2/>2
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Button type="primary" className="small_button" icon="edit" onClick={this.onClickEdit }></Button>
                        <Popconfirm title="Are you sure delete this lesson?" onConfirm={() => this.confirm({lessonId: lesson.id, course_id: this.props.course_id})} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <Button type="primary" className="small_button" icon="close"></Button>
                        </Popconfirm>
                    </div>
                </div>
            </Card>
        );
    }
}
