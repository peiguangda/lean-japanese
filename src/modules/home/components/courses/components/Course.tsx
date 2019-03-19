import * as React from "react";
import {Card} from 'antd';
import {Link} from "react-router-dom";
import {CourseEntity} from "../types";

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
            <Link to={course == null ? '/' : `/course/${course.id}`}>
                <Card
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                >
                    <Meta
                        title={course == null ? "" : course.name}
                        description={course == null ? "" : course.description}
                    />
                </Card>
            </Link>
        );
    }
}
