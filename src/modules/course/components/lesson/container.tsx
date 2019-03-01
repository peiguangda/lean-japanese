import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../redux/reducers';
import { ListLesson } from './components/Page';


const mapStateToProps = (state: State) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

export const ListLessonContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListLesson);
