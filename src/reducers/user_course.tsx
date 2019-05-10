import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import {UserCourseEntity} from "../common/types/user_course";

export const GET_USER_COURSE = "user_course/GET_USER_COURSE";
export const GET_USER_COURSE_ERROR = "user_course/GET_USER_COURSE_ERROR";
export const CREATE_USER_COURSE = "user_course/CREATE_USER_COURSE";
export const CREATE_USER_COURSE_ERROR = "user_course/CREATE_USER_COURSE_ERROR";

export const getUserCourseAction = parameters => dispatch => {
    return dispatch(requestAxios(request.getUserCourse(parameters)))
        .then(response => {
            dispatch({
                type: GET_USER_COURSE,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: GET_USER_COURSE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const createUserCourseAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createUserCourse(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_USER_COURSE,
                payload: response.data
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_USER_COURSE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const userCourseReducer = (state: UserCourseEntity = null, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case GET_USER_COURSE:
            return {...state, ...payload};
        case GET_USER_COURSE_ERROR:
            return {...state, ...payload, responseError};
        case CREATE_USER_COURSE:
            return {...state, ...payload};
        case CREATE_USER_COURSE_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
