import * as React from "react";
import { Helmet } from "react-helmet";
import "../../../public/css/custom.scss";
import { NavigationBar } from "../../navigation_bar/components/Navigation";
import { Course } from "./Course";

export interface Props {
}

export interface State {
}

export class CourseDetail extends React.Component<Props, State, {}> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    // Call api get list data
  }

  public render() {
    return (
      <div className="">
        <Helmet title={"Course"} />
          <NavigationBar/>
          <div className="row">
              <div className="col-md-4">
                <img className="OMC avatarCourse" src="https://storage.googleapis.com/kslearning/images/722984834-1544915140774-47089101_564216997360595_2408262560290701312_n.jpg"/>
              </div>
              <div className="col-md-8">
                Khóa học tiếng nhật N3
              </div>
          </div>
          <div className="row">
            Danh sách bài học
          </div>
      </div>
    );
  }
}
