import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {LessonDetail} from "./components/Page";
import {fetchLessonAction, fetchListLessonAction} from "../../reducers/lesson";
import {createExerciseAction, fetchListExerciseAction} from "../../reducers/exercise";
import {RouteComponentProps} from "react-router";
import {fetchCardProgressAction} from "../../reducers/card_progress";
import {createUserCourseAction, getUserCourseAction} from "../../reducers/user_course";
import {getProfileAction} from "../../reducers/current_user";
import {createTopicHistoryAction, fetchTopicHistoryAction} from "../../reducers/topic_history";
import {createVideoScenarioAction, fetchVideoScenarioAction} from "../../reducers/video_scenario";
import {
    createVideoTimeItemAction,
    fetchListVideoTimeItemAction,
} from "../../reducers/video_time_item";

const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    lesson: state.lesson,
    api: state.api,
    props: props,
    listLesson: state.listLesson,
    listCardProgress: state.listCardProgress,
    userCourse: state.userCourse,
    currentUser: state.currentUser,
    listTopicHistory: state.listTopicHistory,
    videoScenario: state.videoScenario,
    listVideoTimeItem: state.listVideoTimeItem,
    listExercise: state.listExercise,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLesson: parameters => dispatch(fetchLessonAction(parameters)),
    fetchListLesson: parameters => dispatch(fetchListLessonAction(parameters)),
    createExercise: parameters => dispatch(createExerciseAction(parameters)),
    fetchListCardProgress: parameters => dispatch(fetchCardProgressAction(parameters)),
    getUserCourse: (parameters) => dispatch(getUserCourseAction(parameters)),
    getProfile: parameters => dispatch(getProfileAction(parameters)),
    createUserCourse: parameters => dispatch(createUserCourseAction(parameters)),
    createTopicHistory: parameters => dispatch(createTopicHistoryAction(parameters)),
    fetchTopicHistory: parameters => dispatch(fetchTopicHistoryAction(parameters)),
    fetchVideoScenario: parameters => dispatch(fetchVideoScenarioAction(parameters)),
    createVideoScenario: parameters => dispatch(createVideoScenarioAction(parameters)),
    fetchListVideoTimeItem: parameters => dispatch(fetchListVideoTimeItemAction(parameters)),
    createVideoTimeItem: parameters => dispatch(createVideoTimeItemAction(parameters)),
    fetchListExercise: parameters => dispatch(fetchListExerciseAction(parameters)),
});

export const LessonDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonDetail);
