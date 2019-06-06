import * as React from "react";
import {Fragment} from "react";
import {Icon, Tooltip} from "antd";
import {LessonEntity} from "../../../common/types/lesson";
import {toArray} from "../../../helpers/Function";

export interface Props {
    listLesson: Array<LessonEntity>;
    lesson: LessonEntity;
    history: any;

    changeLesson(id): void;
}

export interface State {
}


export class ListLessonHeader extends React.Component<Props, State, {}> {
    public changeLesson = (id) => {
        this.props.changeLesson(id);
        this.props.history.push(`/lesson/${id}`);
    };
    public showListLesson = () => {
        let {lesson, listLesson} = this.props;
        listLesson = toArray(listLesson);
        return listLesson && listLesson.length && listLesson.map((value, index) => {
            return <div className="col-md-1 mt-2 text-center" onClick={() => this.changeLesson(value.id)}>
                <Tooltip placement="top" title={value.name}>
                    <h2 className={`icon-parent-lesson-detail-header ${lesson.id == value.id ? "lesson-current" : ""}`}>
                        <Icon type="folder-open" theme="twoTone"/>
                    </h2>
                </Tooltip>
            </div>
        })
    };

    constructor(props) {
        super(props);
    }

    public componentWillMount() {
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
