import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import {VideoScenarioEntity} from "../common/types/video_scenario";

export const FETCH_VIDEO_SCENARIO = "video_scenario/FETCH_VIDEO_SCENARIO";
export const FETCH_VIDEO_SCENARIO_ERROR = "video_scenario/FETCH_VIDEO_SCENARIO_ERROR";
export const CREATE_VIDEO_SCENARIO = "video_scenario/CREATE_VIDEO_SCENARIO";
export const CREATE_VIDEO_SCENARIO_ERROR = "video_scenario/CREATE_VIDEO_SCENARIO_ERROR";

export const fetchVideoScenarioAction = parameters => dispatch => {
    return dispatch(requestAxios(request.getVideoScenario(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_VIDEO_SCENARIO,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: FETCH_VIDEO_SCENARIO_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const createVideoScenarioAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createVideoScenario(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_VIDEO_SCENARIO,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_VIDEO_SCENARIO_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const videoScenarioReducer = (state: VideoScenarioEntity, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case FETCH_VIDEO_SCENARIO:
            return payload;
        case FETCH_VIDEO_SCENARIO_ERROR:
            return {...state, ...payload, responseError};
        case CREATE_VIDEO_SCENARIO:
            return {...state, ...payload};
        case CREATE_VIDEO_SCENARIO_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
