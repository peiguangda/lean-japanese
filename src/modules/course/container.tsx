import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {CourseDetail} from './components/Page';

const mapStateToProps = (state: State) => ({
    api: state.api,
});

const mapDispatchToProps = (dispatch) => ({});

export const CourseDetailContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseDetail);
