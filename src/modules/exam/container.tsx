import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {Exam} from "./components/Page";
import {RouteComponentProps} from "react-router";
import {fetchListExerciseAction} from "../../reducers/exercise";
import {editCardProgressAction, fetchCardProgressAction} from "../../reducers/card_progress";
import {createUserCourseAction, getUserCourseAction} from "../../reducers/user_course";
import {getProfileAction} from "../../reducers/current_user";
import {fetchLessonAction} from "../../reducers/lesson";
import {createTopicHistoryAction} from "../../reducers/topic_history";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    api: state.api,
    props: props,
    listExercise: state.listExercise,
    listCardProgress: state.listCardProgress,
    userCourse: state.userCourse,
    currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    fetchListExercise: parameters => dispatch(fetchListExerciseAction(parameters)),
    fetchListCardProgress: parameters => dispatch(fetchCardProgressAction(parameters)),
    editCardProgress: parameters => dispatch(editCardProgressAction(parameters)),
    getUserCourse: (parameters) => dispatch(getUserCourseAction(parameters)),
    getProfile: parameters => dispatch(getProfileAction(parameters)),
    createUserCourse: parameters => dispatch(createUserCourseAction(parameters)),
    fetchLesson: parameters => dispatch(fetchLessonAction(parameters)),
    createTopicHistory: parameters => dispatch(createTopicHistoryAction(parameters)),
});

export const ExamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exam);
