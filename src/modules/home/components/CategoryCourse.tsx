import * as React from "react";
import {Icon} from "antd";
import {Link} from "react-router-dom";

export interface Props {
    category_name: String;
    icon: String;
}

export interface State {
}

export class CategoryCourse extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        // Call api get list data
    }

    public render() {
        let {category_name, icon} = this.props;
        return (
            <div>
                <div className="category_course_item_main_panel">
                    <Icon className="category_course_icon" type={`${icon}`}/>
                    <Link className="category_course_name" to="/">{category_name}</Link>
                </div>
            </div>
        );
    }
}
