import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../redux/reducers';
import { ListExercise } from './components/Page';


const mapStateToProps = (state: State) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

export const ListExerciseContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListExercise);
