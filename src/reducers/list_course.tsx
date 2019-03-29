import {CourseEntity} from "../common/types/course";
import * as request from "../api/request";
import {requestAxios} from "../redux/api";

export const FETCH_LIST_COURSE = "course/FETCH_LIST_COURSE";
export const FETCH_LIST_COURSE_ERROR = "course/FETCH_LIST_COURSE_ERROR";

export const fetchListCourseAction = parameters => dispatch => {
    dispatch(requestAxios(request.getCourses(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_LIST_COURSE,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: FETCH_LIST_COURSE_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const listCourseReducer = (state: CourseEntity[], action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case FETCH_LIST_COURSE:
            return payload;
        case FETCH_LIST_COURSE_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
