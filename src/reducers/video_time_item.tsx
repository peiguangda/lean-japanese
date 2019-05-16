import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import {VideoTimeItemEntity} from "../common/types/video_time_item";

export const FETCH_VIDEO_TIME_ITEM = "video_time_item/FETCH_VIDEO_TIME_ITEM";
export const FETCH_VIDEO_TIME_ITEM_ERROR = "video_time_item/FETCH_VIDEO_TIME_ITEM_ERROR";
export const CREATE_VIDEO_TIME_ITEM = "video_time_item/CREATE_VIDEO_TIME_ITEM";
export const CREATE_VIDEO_TIME_ITEM_ERROR = "video_time_item/CREATE_VIDEO_TIME_ITEM_ERROR";

export const fetchListVideoTimeItemAction = parameters => dispatch => {
    return dispatch(requestAxios(request.getListVideoTimeItem(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_VIDEO_TIME_ITEM,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: FETCH_VIDEO_TIME_ITEM_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const createVideoTimeItemAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createVideoTimeItem(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_VIDEO_TIME_ITEM,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_VIDEO_TIME_ITEM_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const videoTimeItemReducer = (state: VideoTimeItemEntity[], action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case FETCH_VIDEO_TIME_ITEM:
            return payload;
        case FETCH_VIDEO_TIME_ITEM_ERROR:
            return {...state, ...payload, responseError};
        case CREATE_VIDEO_TIME_ITEM:
            return {...state, ...payload};
        case CREATE_VIDEO_TIME_ITEM_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
