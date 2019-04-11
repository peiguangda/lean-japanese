import * as React from "react";
import {Fragment} from "react";
import {Icon, Tooltip} from "antd";
import {LessonEntity} from "../../../common/types/lesson";
import {Link} from "react-router-dom";

export interface Props {
    listLesson: Array<LessonEntity>;
    lesson: LessonEntity;

    changeLesson(id): void;
}

export interface State {
}


export class ListLessonHeader extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentWillMount() {
    }

    public changeLesson = (id) => {
        console.log("change lesson", id);
        this.props.changeLesson(id);
    }

    public showListLesson = () => {
        let {lesson, listLesson} = this.props;
        if (listLesson && listLesson.length) {
            return listLesson.map((value, index) => {
                return <div className="col-md-1 mt-2 text-center">
                    <Tooltip placement="top" title={value.name}>
                        <Link to={`/lesson/${value.id}`} className="link_to">
                            <h2 className={`icon-parent-lesson-detail-header ${lesson.id == value.id ? "lesson-current" : ""}`}>
                                <Icon type="folder-open" theme="twoTone"/>
                            </h2>
                        </Link>
                    </Tooltip>
                </div>
            })
        }
    }

    public render() {
        return (
            <Fragment>
                <div className="row lesson-list-header">
                    <div className="col-md-1 h-100 mt-3">
                        <h4><Icon type="left-circle" className="w-100 h-100" theme="twoTone"
                                  twoToneColor="#eb2f96"/></h4>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            {this.showListLesson()}
                        </div>
                    </div>
                    <div className="col-md-1 h-100 mt-3">
                        <h4><Icon type="right-circle" className="w-100 h-100" theme="twoTone"
                                  twoToneColor="#eb2f96"/></h4>
                    </div>
                </div>
            </Fragment>
        );
    }
}
