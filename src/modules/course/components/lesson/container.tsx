import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../../../reducers/reducers';
import {ListLesson} from './components/Page';
import {deleteLessonAction, editLessonAction, fetchListLessonAction} from '../../../../reducers/lesson';
import {RouteComponentProps} from "react-router";

const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lessons: state.listLesson,
    api: state.api,
    props: props,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLessons: (parameters) => dispatch(fetchListLessonAction(parameters)),
    deleteLesson: (parameters) => dispatch(deleteLessonAction(parameters)),
    editLesson: (parameters) => dispatch(editLessonAction(parameters)),
});

export const ListLessonContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListLesson);
