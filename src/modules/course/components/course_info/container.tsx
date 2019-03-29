import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../../../reducers/reducers';
import {CourseInfo} from './components/Page';
import {fetchCourseAction} from "../../../../reducers/course";
import {createLessonAction, fetchListLessonAction} from "../../../../reducers/lesson";
import {RouteComponentProps} from "react-router";

const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    course: state.course,
    api: state.api,
    props: props
});

const mapDispatchToProps = (dispatch) => ({
    fetchCourse: (parameters) => dispatch(fetchCourseAction(parameters)),
    createLesson: (parameters) => dispatch(createLessonAction(parameters)),
    fetchLessons: (parameters) => dispatch(fetchListLessonAction(parameters)),
});

export const CourseInfoContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseInfo);
