import * as React from "react";
import {Card} from 'antd';
import {Link} from "react-router-dom";
import {CourseEntity} from "../types";
import "../../../../../public/css/custom.scss";

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
        console.log("course",typeof course);
        return (
            <Link className="col-md-4 col-lg-4" to={course ? `/course/${course.id}` : '/'}>
                <Card
                    className="course_list"
                    hoverable
                    cover={<img alt={course ? course.name : ""} src={course ? course.avatar : ""}/>}
                >
                    <Meta
                        title={course ? course.name : ""}
                        description={course ? course.description : ""}
                    />
                </Card>
            </Link>
        );
    }
}
