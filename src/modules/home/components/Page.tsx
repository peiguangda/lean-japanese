import * as React from "react";
import { Helmet } from "react-helmet";
import "../../../public/css/custom.css";
import { NavigationBar } from "../../navigation_bar/components/Navigation";
import { CategoryCourse } from "./CategoryCourse";
import { Course } from "./Course";

export interface Props {
}

export interface State {
}

export class HomePage extends React.Component<Props, State, {}> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    // Call api get list data
  }

  public render() {
    return (
      <div>
        <Helmet title={"Easy Japanese"} />
          <NavigationBar/>
          <div className="row">
              <div className="col-md-3">
                  <div className="LYB">Danh mục khoá học</div>
                  <div className="KYB">
                      <CategoryCourse category_name="Tất cả khoá học" icon="desktop"/>
                      <CategoryCourse category_name="Khóa học tiếng nhật" icon="read"/>
                  </div>
              </div>

              <div className="col-md-9">
                  <div className="row">
                      <Course/>
                      <Course/>
                      <Course/>
                  </div>
              </div>
          </div>
      </div>

    );
  }
}
