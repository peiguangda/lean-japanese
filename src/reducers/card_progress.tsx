import {CardProgressEntity} from "../common/types/card_progress";
import * as request from "../api/request";
import {requestAxios} from "../redux/api";

export const FETCH_CARD_PROGRESS = "card_progress/FETCH_CARD_PROGRESS";
export const FETCH_CARD_PROGRESS_ERROR = "card_progress/FETCH_CARD_PROGRESS_ERROR";
export const CREATE_CARD_PROGRESS = "card_progress/CREATE_CARD_PROGRESS";
export const CREATE_CARD_PROGRESS_ERROR = "card_progress/CREATE_CARD_PROGRESS_ERROR";

export const fetchCardProgressAction = parameters => dispatch => {
    dispatch(requestAxios(request.getCardProgresses(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_CARD_PROGRESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: FETCH_CARD_PROGRESS_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const createCardProgressAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createCardProgress(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_CARD_PROGRESS,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_CARD_PROGRESS_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const cardProgressReducer = (state: CardProgressEntity[], action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case FETCH_CARD_PROGRESS:
            return payload;
        case FETCH_CARD_PROGRESS_ERROR:
            return {...state, ...payload, responseError};
        case CREATE_CARD_PROGRESS:
            return {...state, ...payload};
        case CREATE_CARD_PROGRESS_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
