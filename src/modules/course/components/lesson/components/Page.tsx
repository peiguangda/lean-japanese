import * as React from "react";
import {Helmet} from "react-helmet";
import {Modal, Button, message} from 'antd';
import {Lesson} from './Lesson';
import {LessonEntity} from "../types";
import {ApiEntity} from "../../../../../common/types";
import {Loader} from "../../../../loader/components/loader";

export interface Props {
    fetchLessons(parameters): void
    deleteLesson(parameters): Promise<any>;
    lessons: LessonEntity[];
    api: ApiEntity;
}

export interface State {
}

export class ListLesson extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        let {children} = this.props;
        this.props.fetchLessons({course_id: children["id"]});
    }

    public _deleteLesson = params =>{
        console.log("params", params);
        this.props.deleteLesson({course_id: params.course_id, id: params.lessonId})
        .then(response => {
            console.log("response",response);
            if(response.status == "success")
            {
                message.success('Successful!');
                this.props.fetchLessons({course_id: params.course_id});
            }
        })
    }

    private showListLesson = () => {
        let {lessons} = this.props;
        if (lessons && lessons.length)
            return lessons.map((item, index) => {
                return <Lesson lesson={item} key={index} deleteLesson={this._deleteLesson} course_id={this.props.children["id"]}/>;
            });
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
