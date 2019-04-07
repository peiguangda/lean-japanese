import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {CategoryCourse} from "./CategoryCourse";
import {CourseContainer} from "./courses/container";
import {BackTop, Layout} from "antd";
import {NavigationBarContainter} from "../../navigation_bar/container";

const {
    Footer
} = Layout;

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
                                <CategoryCourse category_name="Khóa học đã tham gia" icon="user"/>
                                <CategoryCourse category_name="Khóa học của tôi" icon="solution"/>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <CourseContainer/>
                        </div>
                    </div>
                </div>
                <Footer style={{textAlign: 'center'}}>
                    Easy Japanese Design ©2019 Created by HEDSPI
                </Footer>
                <BackTop/>
            </Fragment>
        );
    }
}
