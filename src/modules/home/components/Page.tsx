import * as React from "react";
import {Helmet} from "react-helmet";
import {CategoryCourse} from "./CategoryCourse";
import {CourseContainer} from "./courses/container";
import {Fragment} from "react";
import {BackTop} from "antd";
import {NavigationBarContainter} from "../../navigation_bar/container";

export interface Props {
}

export interface State {
}

export class HomePage extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
    }

    public render() {
        return (
            <Fragment>
                <NavigationBarContainter/>
                <div className="container">
                    <Helmet title={"Easy Japanese"}/>
                    <div className="row home_layout">
                        <div className="col-md-3 category_box">
                            <div className="category_index">Danh mục khoá học</div>
                            <div className="category_item">
                                <CategoryCourse category_name="Tất cả khoá học" icon="desktop"/>
                                <CategoryCourse category_name="Khóa học tiếng nhật" icon="read"/>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <CourseContainer/>
                        </div>
                    </div>
                </div>
                <BackTop/>
            </Fragment>
        );
    }
}
