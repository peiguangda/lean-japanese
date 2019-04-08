import * as React from "react";
import {Course} from "./Course"
import {CourseEntity} from "../../../../../common/types/course";
import {ApiEntity} from "../../../../../common/types";
import {Loader} from "../../../../loader/components/loader";
import {toArray} from "../../../../../helpers/Function";

export interface Props {
    courses: CourseEntity[];
    api: ApiEntity;
    loadings: number;

    fetchCourses(parameters): void

    createCourse(parameters): Promise<any>;
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
        let {courses} = this.props;
        courses = toArray(courses);
        if (courses && courses.length)
            return courses.map((value, index) => {
                return <Course
                    course={value}
                    key={index}
                    createCourse={this.props.createCourse}
                />
            });
    }

    public render() {
        let {api, courses} = this.props;
        return (
            <div className="row">
                {api.loadings > 0 ? <Loader/> : this.showListCourse()}
            </div>
        );
    }
}
