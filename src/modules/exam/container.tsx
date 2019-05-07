import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {Exam} from "./components/Page";
import {RouteComponentProps} from "react-router";
import {fetchListExerciseAction} from "../../reducers/exercise";
import {editCardProgressAction, fetchCardProgressAction} from "../../reducers/card_progress";
import {getUserCourseAction} from "../../reducers/user_course";
import {getProfileAction} from "../../reducers/current_user";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    api: state.api,
    props: props,
    listExercise: state.listExercise,
    listCardProgress: state.listCardProgress,
    userCourse: state.userCourse
});

const mapDispatchToProps = (dispatch) => ({
    fetchListExercise: parameters => dispatch(fetchListExerciseAction(parameters)),
    fetchListCardProgress: parameters => dispatch(fetchCardProgressAction(parameters)),
    editCardProgress: parameters => dispatch(editCardProgressAction(parameters)),
    getUserCourse: (parameters) => dispatch(getUserCourseAction(parameters)),
    getProfile: parameters => dispatch(getProfileAction(parameters)),
});

export const ExamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exam);
