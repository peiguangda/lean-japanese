import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {LessonDetail} from "./components/Page";
import {fetchLessonAction, fetchListLessonAction} from "../../reducers/lesson";
import {createExerciseAction} from "../../reducers/exercise";
import {RouteComponentProps} from "react-router";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lesson: state.lesson,
    api: state.api,
    props: props,
    listLesson: state.listLesson
});

const mapDispatchToProps = (dispatch) => ({
    fetchLesson: parameters => dispatch(fetchLessonAction(parameters)),
    fetchListLesson: parameters => dispatch(fetchListLessonAction(parameters)),
    createExercise: parameters => dispatch(createExerciseAction(parameters)),
});

export const LessonDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonDetail);
