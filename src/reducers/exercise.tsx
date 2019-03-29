import {ExerciseEntity} from "../common/types/exercise";
import * as request from "../api/request";
import {requestAxios} from "../redux/api";

export const CREATE_EXERCISE = "lesson/CREATE_EXERCISE";
export const CREATE_EXERCISE_ERROR = "lesson/CREATE_EXERCISE_ERROR";
export const DELETE_EXERCISE = "lesson/DELETE_EXERCISE";
export const DELETE_EXERCISE_ERROR = "lesson/DELETE_EXERCISE_ERROR";
export const GET_LIST_EXERCISE = "lesson/GET_LIST_EXERCISE";
export const GET_LIST_EXERCISE_ERROR = "lesson/GET_LIST_EXERCISE_ERROR";
export const FETCH_EXERCISE = "lesson/FETCH_EXERCISE";
export const FETCH_EXERCISE_ERROR = "lesson/FETCH_EXERCISE_ERROR";

export const createExerciseAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createExercise(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_EXERCISE,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_EXERCISE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const deleteExerciseAction = parameters => dispatch => {
    return dispatch(requestAxios(request.deleteExercise(parameters)))
        .then(response => {
            dispatch({
                type: DELETE_EXERCISE,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: DELETE_EXERCISE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const editExerciseAction = parameters => dispatch => {
    return dispatch(requestAxios(request.editExercise(parameters)))
        .then(response => {
            dispatch({
                type: DELETE_EXERCISE,
                payload: response
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: DELETE_EXERCISE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const fetchExerciseAction = parameters => dispatch => {
    dispatch(requestAxios(request.showExercise(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_EXERCISE,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: FETCH_EXERCISE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const fetchListExerciseAction = parameters => dispatch => {
    dispatch(requestAxios(request.getExercises(parameters)))
        .then(response => {
            dispatch({
                type: GET_LIST_EXERCISE,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: GET_LIST_EXERCISE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const listExerciseReducer = (state: ExerciseEntity[], action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case GET_LIST_EXERCISE:
            return payload;
        case GET_LIST_EXERCISE_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};

export const exerciseReducer = (state: ExerciseEntity = null, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (action.type) {
        case CREATE_EXERCISE:
            return {...state, ...payload};
        case CREATE_EXERCISE_ERROR:
            return {...state, ...payload, responseError};
        case FETCH_EXERCISE:
            return {...state, ...payload};
        case FETCH_EXERCISE_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};