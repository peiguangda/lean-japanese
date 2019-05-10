import {UserEntity} from "../common/types/user";
import * as request from "../api/request";
import {requestAxios} from "../redux/api";
import * as Cookie from "../helpers/Cookie";

export const CREATE_USER = "user/CREATE_USER";
export const CREATE_USER_ERROR = "user/CREATE_USER_ERROR";


export const createUserAction = parameters => dispatch => {
    return dispatch(requestAxios(request.createUser(parameters)))
        .then(response => {
            dispatch({
                type: CREATE_USER,
                payload: response
            });
            return response;
        })
        .catch(error => {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: {},
                responseError: error
            });
        });
};

export const userReducer = (state: UserEntity = null, action) => {
    const {type, payload = {}, responseError = {}} = action;
    state = {...state};
    switch (type) {
        case CREATE_USER:
            return {...state, ...payload.data};
        case CREATE_USER_ERROR:
            return {...state, ...payload, responseError};
        default:
            return state;
    }

};


