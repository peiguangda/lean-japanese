import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../redux/reducers';
import { ListCourse } from './components/Page';
import { fetchCourseAction } from './reducer';
const mapStateToProps = (state: State) => ({
    course: state.course
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchCourses: (parameters) => dispatch(fetchCourseAction(parameters)),
});
export const CourseContainer = connect(
mapStateToProps,
mapDispatchToProps
)(ListCourse);
