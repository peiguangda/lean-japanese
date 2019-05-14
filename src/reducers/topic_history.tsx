import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import {TopicHistoryEntity} from "../common/types/topic_history";

export const FETCH_TOPIC_HISTORY = "topic_history/FETCH_TOPIC_HISTORY";
export const FETCH_TOPIC_HISTORY_ERROR = "topic_history/FETCH_TOPIC_HISTORY_ERROR";
export const CREATE_TOPIC_HISTORY = "topic_history/CREATE_TOPIC_HISTORY";
export const CREATE_TOPIC_HISTORY_ERROR = "topic_history/CREATE_TOPIC_HISTORY_ERROR";
export const EDIT_TOPIC_HISTORY = "topic_history/EDIT_TOPIC_HISTORY";
export const EDIT_TOPIC_HISTORY_ERROR = "topic_history/EDIT_TOPIC_HISTORY_ERROR";

export const fetchTopicHistoryAction = parameters => dispatch => {
    dispatch(requestAxios(request.getTopicHistories(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_TOPIC_HISTORY,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: FETCH_TOPIC_HISTORY_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const createTopicHistoryAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createTopicHistory(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_TOPIC_HISTORY,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_TOPIC_HISTORY_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const editTopicHistoryAction = parameters => dispatch => {
    return dispatch(requestAxios(request.editTopicHistory(parameters)))
        .then(response => {
            dispatch({
                type: EDIT_TOPIC_HISTORY,
                payload: response
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: EDIT_TOPIC_HISTORY_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const topicHistoryReducer = (state: TopicHistoryEntity[], action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case FETCH_TOPIC_HISTORY:
            return payload;
        case FETCH_TOPIC_HISTORY_ERROR:
            return {...state, ...payload, responseError};
        case CREATE_TOPIC_HISTORY:
            return {...state, ...payload};
        case CREATE_TOPIC_HISTORY_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
