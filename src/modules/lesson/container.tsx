import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers/reducers';
import { LessonDetail } from './components/Page';
import {fetchLessonAction} from "../../reducers/lesson";


const mapStateToProps = (state: State) => ({
    lesson: state.lesson,
    api: state.api
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchLesson : parameters => dispatch(fetchLessonAction(parameters))
});

export const LessonDetailContainter = connect(
mapStateToProps,
mapDispatchToProps
)(LessonDetail);
