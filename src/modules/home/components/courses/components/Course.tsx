import * as React from "react";
import {Card} from 'antd';
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
            <Link className="col-md-4 col-lg-4" to={course ? `/course/${course.id}` : '/'}>
                <Card
                    className="course_list"
                    hoverable
                    cover={<img alt={course ? course.name : ""} src={course ? course.avatar : ""}/>}
                >
                    <Meta
                        title={course ? course.name : ""}
                        description={course ? course.short_description : ""}
                    />
                </Card>
            </Link>
        );
    }
}
