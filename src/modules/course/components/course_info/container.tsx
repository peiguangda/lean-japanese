import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../redux/reducers';
import { CourseInfo } from './components/Page';
import {fetchCourseAction} from "./reducer";
import {createLessonAction} from "../lesson/reducer";
import { fetchListLessonAction } from '../lesson/reducer';

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
