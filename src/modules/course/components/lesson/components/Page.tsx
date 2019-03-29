import * as React from "react";
import {Helmet} from "react-helmet";
import {message} from 'antd';
import {Lesson} from './Lesson';
import {LessonEntity} from "../../../../../common/types/lesson";
import {ApiEntity} from "../../../../../common/types";
import {Loader} from "../../../../loader/components/loader";
import {toArray} from "../../../../../helpers/Function";
import {RouteComponentProps} from "react-router";

export interface Props extends RouteComponentProps<any, any> {
    lessons: LessonEntity[];
    api: ApiEntity;
    props: any;

    fetchLessons(parameters): void

    deleteLesson(parameters): Promise<any>;

    editLesson(parameters): Promise<any>;
}

export interface State {
}

export class ListLesson extends React.Component<Props, State, {}> {
    public _deleteLesson = params => {
        this.props.deleteLesson({course_id: params.course_id, id: params.lessonId})
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchLessons({course_id: params.course_id});
                }
            })
    }
    public _editLesson = params => {
        this.props.editLesson(params)
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchLessons({course_id: params.course_id});
                }
            })
    }
    private showListLesson = () => {
        let {lessons} = this.props;
        lessons = toArray(lessons);
        if (lessons && lessons.length)
            return lessons.map((item, index) => {
                return <Lesson
                    lesson={item}
                    deleteLesson={this._deleteLesson}
                    fetchLesson={this.props.fetchLessons}
                    course_id={this.props.params.id}
                    editLesson={this._editLesson}
                />;
            });
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("aaaaaaaaa", this.props.params.id);
        this.props.fetchLessons({course_id: this.props.params.id});
    }

    public render() {
        let {api} = this.props;
        return (
            <div className="row offset-1">
                {api.loadings > 0 ? <Loader/> : this.showListLesson()}
            </div>
        );
    }
}
