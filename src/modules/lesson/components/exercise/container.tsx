import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../../../reducers/reducers';
import {deleteExerciseAction, editExerciseAction, fetchListExerciseAction} from "../../../../reducers/exercise";
import {ListExercise} from "./components/Page";
import {RouteComponentProps} from "react-router";


const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    listExercise: state.listExercise,
    props: props,
});

const mapDispatchToProps = (dispatch) => ({
    fetchListExercise: parameters => dispatch(fetchListExerciseAction(parameters)),
    deleteExercise: parameters => dispatch(deleteExerciseAction(parameters)),
    editExercise: parameters => dispatch(editExerciseAction(parameters)),
});

export const ListExerciseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListExercise);
