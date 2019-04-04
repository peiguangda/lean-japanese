import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import {UserCourseEntity} from "../common/types/user_course";

export const FETCH_MEM = "member/FETCH_MEM";
export const FETCH_MEM_ERROR = "member/FETCH_MEM_ERROR";

export const fetchMemAction = parameters => dispatch => {
    dispatch(requestAxios(request.getMemAttendCourse(parameters)))
        .then(response => {
            dispatch({
                type: FETCH_MEM,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: FETCH_MEM_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const memberReducer = (state: UserCourseEntity = null, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case FETCH_MEM:
            return {...state, ...payload};
        case FETCH_MEM_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }
};
