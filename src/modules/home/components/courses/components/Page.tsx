import * as React from "react";
import {Course} from "./Course"
import {CourseEntity} from "../types";
import {values} from "lodash";

export interface Props {
    fetchCourses(parameters): void

    courses: CourseEntity[];
}

export interface State {
}

export class ListCourse extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentWillMount() {
        this.props.fetchCourses({});
    }

    public showListCourse() {
        let result = [];
        values(this.props.courses).map((value, index) => {
            result.push(<Course course={value} key={index}/>);
        });
        return result;
    }

    public render() {
        let {courses} = this.props;
        console.log(values(courses));
        return (
            <div className="row">
                {this.showListCourse()}
            </div>
        );
    }
}
