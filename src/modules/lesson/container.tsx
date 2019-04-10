import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {LessonDetail} from "./components/Page";
import {fetchLessonAction} from "../../reducers/lesson";
import {createExerciseAction} from "../../reducers/exercise";
import {RouteComponentProps} from "react-router";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lesson: state.lesson,
    api: state.api,
    props: props,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLesson: parameters => dispatch(fetchLessonAction(parameters)),
    createExercise: parameters => dispatch(createExerciseAction(parameters)),
});

export const LessonDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonDetail);
