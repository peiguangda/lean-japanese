import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../reducers/reducers';
import { ListLesson } from './components/Page';
import { fetchListLessonAction, deleteLessonAction, editLessonAction } from '../../../../reducers/lesson';

const mapStateToProps = (state: State) => ({
    lessons: state.listLesson,
    api: state.api
});

const mapDispatchToProps = (dispatch) => ({
    fetchLessons: (parameters) => dispatch(fetchListLessonAction(parameters)),
    deleteLesson: (parameters) => dispatch(deleteLessonAction(parameters)),
    editLesson: (parameters) => dispatch(editLessonAction(parameters)),
});

export const ListLessonContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListLesson);
