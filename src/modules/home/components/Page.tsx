import * as React from "react";
import {Helmet} from "react-helmet";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {CategoryCourse} from "./CategoryCourse";
import {Loader} from "../../loader/components/loader";
import * as ReactDOM from "react-dom";
import {CourseContainer} from "./courses/container";
import {Fragment} from "react";

export interface Props {
}

export interface State {
}

export class HomePage extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        let element = document.getElementById('loader');
        if (element) {
            // fade out
            ReactDOM.render(<Loader/>, element);
            setTimeout(() => {
                element = document.getElementById('main-loading');
                element.parentNode.removeChild(element);
            }, 2000)
        }
    }

    public render() {
        return (
            <Fragment>
                <NavigationBar/>
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
            </Fragment>
        );
    }
}
