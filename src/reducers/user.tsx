import { UserEntity } from "../common/types/user";
import * as request from "../api/request";
import { requestAxios } from "../redux/api";

export const CREATE_SESSION = "user/CREATE_SESSION";
export const CREATE_SESSION_ERROR = "user/CREATE_SESSION_ERROR";

export const createSessionAction = parameters => dispatch => {
  dispatch(requestAxios(request.createSession(parameters)))
    .then(response => {
      dispatch({
        type: CREATE_SESSION,
        payload: response.data
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

export const userReducer = (state: UserEntity = null, action) => {
  const { type, payload = {}, responseError = {} } = action;
  state = { ...state, actionType: action.type };
  switch (type) {
    case CREATE_SESSION:
      return { ...state, ...payload };
    case CREATE_SESSION_ERROR:
      return { ...state, ...payload, responseError };
  }

  return state;
};
