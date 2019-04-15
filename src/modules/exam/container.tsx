import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {Exam} from "./components/Page";
import {fetchLessonAction} from "../../reducers/lesson";
import {RouteComponentProps} from "react-router";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lesson: state.lesson,
    api: state.api,
    props: props,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLesson: parameters => dispatch(fetchLessonAction(parameters)),
});

export const ExamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exam);
