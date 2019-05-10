import {UserEntity} from "../common/types/user";
import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import * as Cookie from "../helpers/Cookie";

export const CREATE_SESSION = "user/CREATE_SESSION";
export const CREATE_SESSION_ERROR = "user/CREATE_SESSION_ERROR";
export const DELETE_SESSION = "user/DELETE_SESSION";
export const DELETE_SESSION_ERROR = "user/DELETE_SESSION";
export const GET_PROFILE = "user/GET_PROFILE";
export const GET_PROFILE_ERROR = "user/GET_PROFILE_ERROR";

export const createSessionAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createSession(parameters)))
        .then(response => {
            Cookie.setAccessToken(response.data.auth_token);
            dispatch({
                type: CREATE_SESSION,
                payload: response
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_SESSION_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const LogoutAction = parameters => dispatch => {
    return dispatch(requestAxios(request.deleteSession(parameters)))
        .then(response => {
            Cookie.removeAccessToken();
            dispatch({
                type: DELETE_SESSION,
                payload: response
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: DELETE_SESSION_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const getProfileAction = parameters => dispatch => {
    return dispatch(requestAxios(request.getProfile(parameters)))
        .then(response => {
            dispatch({
                type: GET_PROFILE,
                payload: response
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: GET_PROFILE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const currentUserReducer = (state: UserEntity = null, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case CREATE_SESSION:
            return {...state, ...payload.data};
        case CREATE_SESSION_ERROR:
            return {...state, ...payload, responseError};
        case DELETE_SESSION:
            return {...state, ...payload};
        case DELETE_SESSION_ERROR:
            return {...state, ...payload, responseError};
        case GET_PROFILE:
            return payload.data;
        case GET_PROFILE_ERROR:
            return {...state, responseError};
        default:
            return state;
    }

};
