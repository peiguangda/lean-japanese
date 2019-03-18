import * as React from "react";
import * as ReactDOM from "react-dom";
import { Course } from "./Course"

export interface Props {
    fetchCourses(parameters): void
}

export interface State {
}

export class ListCourse extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        this.props.fetchCourses({});
    }

    public render() {
        console.log(this.props);
        return (
            <div className="row">
                <Course/>
                <Course/>
                <Course/>
            </div>
        );
    }
}
