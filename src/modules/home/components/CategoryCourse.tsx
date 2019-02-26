import * as React from "react";
import "../../../public/css/custom.css";

export interface Props {
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
        return (
            <div>
                <div className="JBD category_course_item_main_panel">
                    <img className="IBD category_course_item_avatar" src="resources/images/allcourse.png" />
                    <div className="KBD category_course_item_name">Tất cả
                        khoá học
                    </div>
                </div>
            </div>
        );
    }
}
