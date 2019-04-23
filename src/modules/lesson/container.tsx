import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {LessonDetail} from "./components/Page";
import {fetchLessonAction, fetchListLessonAction} from "../../reducers/lesson";
import {createExerciseAction} from "../../reducers/exercise";
import {RouteComponentProps} from "react-router";
import {fetchCardProgressAction} from "../../reducers/card_progress";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lesson: state.lesson,
    api: state.api,
    props: props,
    listLesson: state.listLesson,
    listCardProgress: state.listCardProgress
});

const mapDispatchToProps = (dispatch) => ({
    fetchLesson: parameters => dispatch(fetchLessonAction(parameters)),
    fetchListLesson: parameters => dispatch(fetchListLessonAction(parameters)),
    createExercise: parameters => dispatch(createExerciseAction(parameters)),
    fetchListCardProgress: parameters => dispatch(fetchCardProgressAction(parameters)),
});

export const LessonDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonDetail);
