import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {HomePage} from './components/Page';
import {createCourseAction} from "../../reducers/course";

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch) => ({
    createCourse: (parameters) => dispatch(createCourseAction(parameters)),
});
export const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
