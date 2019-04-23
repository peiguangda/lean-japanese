import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {Exam} from "./components/Page";
import {RouteComponentProps} from "react-router";
import {fetchListExerciseAction} from "../../reducers/exercise";
import {editCardProgressAction, fetchCardProgressAction} from "../../reducers/card_progress";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lesson: state.lesson,
    api: state.api,
    props: props,
    listExercise: state.listExercise,
    listCardProgress: state.listCardProgress
});

const mapDispatchToProps = (dispatch) => ({
    fetchListExercise: parameters => dispatch(fetchListExerciseAction(parameters)),
    fetchListCardProgress: parameters => dispatch(fetchCardProgressAction(parameters)),
    editCardProgress: parameters => dispatch(editCardProgressAction(parameters)),
});

export const ExamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exam);
