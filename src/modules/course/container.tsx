import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {CourseDetail} from './components/Page';
import {RouteComponentProps} from "react-router";
import {fetchCourseAction} from "../../reducers/course";
import {createUserCourseAction, getUserCourseAction} from "../../reducers/user_course";
import {getProfileAction} from "../../reducers/current_user";

const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    api: state.api,
    props: props,
    course: state.course,
    userCourse: state.userCourse,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCourse: (parameters) => dispatch(fetchCourseAction(parameters)),
    getUserCourse: (parameters) => dispatch(getUserCourseAction(parameters)),
    getProfile: parameters => dispatch(getProfileAction(parameters)),
    createUserCourse: parameters => dispatch(createUserCourseAction(parameters)),
});

export const CourseDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseDetail);
