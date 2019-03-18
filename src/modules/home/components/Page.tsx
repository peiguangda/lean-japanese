import * as React from "react";
import {Helmet} from "react-helmet";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {CategoryCourse} from "./CategoryCourse";
import {Loader} from "../../loader/components/loader";
import * as ReactDOM from "react-dom";
import {CourseContainer} from "./courses/container";

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
            <div className="container">
                {/*<Loader/>*/}
                <Helmet title={"Easy Japanese"}/>
                <NavigationBar/>
                <div className="row">
                    <div className="col-md-3">
                        <div className="">Danh mục khoá học</div>
                        <div className="">
                            <CategoryCourse category_name="Tất cả khoá học" icon="desktop"/>
                            <CategoryCourse category_name="Khóa học tiếng nhật" icon="read"/>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <CourseContainer/>
                    </div>
                </div>
            </div>

        );
    }
}
