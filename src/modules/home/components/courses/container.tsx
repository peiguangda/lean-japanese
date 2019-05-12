import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../../../reducers/reducers';
import {ListCourse} from './components/Page';
import {fetchListCourseAction} from '../../../../reducers/list_course';

const mapStateToProps = (state: State) => ({
    courses: state.listCourse,
    api: state.api
});

const mapDispatchToProps = (dispatch) => ({
    fetchCourses: (parameters) => dispatch(fetchListCourseAction(parameters)),
});
export const CourseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCourse);
