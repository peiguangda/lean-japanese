import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../reducers/reducers';
import { CourseInfo } from './components/Page';
import {fetchCourseAction} from "../../../../reducers/course";
import {createLessonAction} from "../../../../reducers/lesson";
import { fetchListLessonAction } from '../../../../reducers/lesson';

const mapStateToProps = (state: State) => ({
    course: state.course,
    api: state.api,
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
