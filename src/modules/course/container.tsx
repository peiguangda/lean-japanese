import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {CourseDetail} from './components/Page';
import {RouteComponentProps} from "react-router";

const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    api: state.api,
    props: props
});

const mapDispatchToProps = (dispatch) => ({});

export const CourseDetailContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseDetail);
