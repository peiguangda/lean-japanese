import * as React from "react";
import {Course} from "./Course"
import {CourseEntity} from "../types";
import {ApiEntity} from "../../../../../common/types";
import {Loader} from "../../../../loader/components/loader";

export interface Props {
    fetchCourses(parameters): void

    courses: CourseEntity[];
    api: ApiEntity;
    loadings: number;
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
        if (courses && courses.length)
            return courses.map((value, index) => {
                return <Course course={value} key={index}/>
            });
    }

    public render() {
        let {api} = this.props;
        return (
            <div className="row">
                {api.loadings > 0 ? <Loader/> : this.showListCourse()}
            </div>
        );
    }
}
