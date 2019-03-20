import * as React from "react";
import {Helmet} from "react-helmet";
import {NavigationBar} from "../../navigation_bar/components/Navigation";
import {ListLessonContainter} from "./lesson/container";
import {ApiEntity} from '../../../common/types/index';
import {Loader} from "../../loader/components/loader";
import {CourseInfoContainter} from "./course_info/container";

export interface Props {
    api: ApiEntity;
    match: any;
    params: any;
}

export interface State {
}

export class CourseDetail extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {}
    }


    public render() {
        let {api} = this.props;
        let {match: {params}} = this.props;
        return (
            <div className="container">
                <Helmet title={"Course"}/>
                <NavigationBar/>
                <div>
                    {api.loadings > 0 ? <Loader/> : ""}
                    <CourseInfoContainter children={params}/>
                    <div className="">
                        <ListLessonContainter/>
                    </div>
                </div>
            </div>
        );
    }
}
