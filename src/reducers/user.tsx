import {UserEntity} from "../common/types/user";
import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import * as Cookie from "../helpers/Cookie";

export const CREATE_SESSION = "user/CREATE_SESSION";
export const CREATE_SESSION_ERROR = "user/CREATE_SESSION_ERROR";
export const GET_PROFILE = "user/GET_PROFILE";
export const GET_PROFILE_ERROR = "user/GET_PROFILE_ERROR";

export const createSessionAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createSession(parameters)))
        .then(response => {
            Cookie.setAccessToken(response.data.auth_token);
            return dispatch({
                type: CREATE_SESSION,
                payload: response
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_SESSION_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const getProfileAction = parameters => dispatch => {
    return dispatch(requestAxios(request.getProfile(parameters)))
        .then(response => {
            return dispatch({
                type: GET_PROFILE,
                payload: response
            });
        })
        .catch(error => {
            dispatch({
                type: GET_PROFILE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const userReducer = (state: UserEntity = null, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state, actionType: action.type};
    switch (type) {
        case CREATE_SESSION:
            console.log(payload);
            console.log("asdf", {...state, ...payload.data});
            return {...state, user: {...payload.data}};
        case CREATE_SESSION_ERROR:
            return {...state, ...payload, responseError};
        case GET_PROFILE:
            return {...state,user: {...payload.data}};
        case GET_PROFILE_ERROR:
            return {...state, ...payload, responseError};
    }
    return state;
};
