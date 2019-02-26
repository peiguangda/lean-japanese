import * as React from "react";
import { Helmet } from "react-helmet";
import "../../../public/css/custom.css";
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
      <div>
        <Helmet title={"Course"} />
          <NavigationBar/>
          <div className="row">
              <Course/>
              <Course/>
              <Course/>
          </div>
      </div>
    );
  }
}
