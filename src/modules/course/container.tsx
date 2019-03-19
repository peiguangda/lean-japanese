import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import { CourseDetail } from './components/Page';
import { fetchCourseAction } from './reducer';

const mapStateToProps = (state: State) => ({
    course: state.course,
    api: state.api
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchCourse: (parameters) => dispatch(fetchCourseAction(parameters)),
});

export const CourseDetailContainter = connect(
mapStateToProps,
mapDispatchToProps
)(CourseDetail);
