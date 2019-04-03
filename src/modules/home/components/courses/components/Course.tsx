import * as React from "react";
import {Fragment} from "react";
import {Button, Card, Icon, Rate} from 'antd';
import {Link} from "react-router-dom";
import {CourseEntity} from "../../../../../common/types/course";

const {Meta} = Card;

export interface Props {
    course: CourseEntity
}

export interface State {
}

export class Course extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        // Call api get list data
    }

    public render() {
        let {course} = this.props;
        return (
            <Fragment>
                <Button type="primary" icon="plus" className="right-corder-container"/>
                <Link className="col-md-4 col-lg-4" to={course ? `/course/${course.id}` : '/'}>
                    <Card
                        className="course_list"
                        hoverable
                        cover={<img alt={course ? course.name : ""} src={course ? course.avatar : ""}/>}
                    >
                        <Meta
                            title={course ? course.name : ""}
                        />
                        <div className="LOC">
                            <div className="BOC">
                                <div className="FOC">
                                    <Icon type="team"/>
                                </div>
                                <div className="DOC">{course.member_num ? course.member_num : 0}</div>
                            </div>
                            <div className="BOC">
                                <Rate allowHalf defaultValue={3}/>
                            </div>
                        </div>
                        <div className="LOC">
                            <div className="GOC">{course.cost ? course.cost : 0}</div>
                        </div>
                    </Card>
                </Link>
            </Fragment>
        );
    }
}
