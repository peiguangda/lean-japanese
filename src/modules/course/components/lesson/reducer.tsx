import { LessonEntity } from "./types";
import * as request from "../../../../api/request";
import { requestAxios } from "../../../../redux/api";

export const CREATE_LESSON = "course/CREATE_LESSON";
export const CREATE_LESSON_ERROR = "course/CREATE_LESSON_ERROR";
export const DELETE_LESSON = "course/DELETE_LESSON";
export const DELETE_LESSON_ERROR = "course/DELETE_LESSON_ERROR";
export const GET_LIST_LESSON = "course/GET_LIST_LESSON";
export const GET_LIST_LESSON_ERROR = "course/GET_LIST_LESSON_ERROR";

export const createLessonAction = parameters => dispatch => {
  return dispatch(requestAxios(request.createLesson(parameters)))
    .then(response => {
      dispatch({
        type: CREATE_LESSON,
        payload: response.data
      });
      return response;
    })
    .catch(error => {
      dispatch({
        type: CREATE_LESSON_ERROR,
        payload: {},
        responseError: error
      });
    });
};

export const deleteLessonAction = parameters => dispatch => {
  return dispatch(requestAxios(request.deleteLesson(parameters)))
    .then(response => {
      dispatch({
        type: DELETE_LESSON,
        payload: response.data
      });
      return response;
    })
    .catch(error => {
      dispatch({
        type: DELETE_LESSON_ERROR,
        payload: {},
        responseError: error
      });
    });
};

export const fetchListLessonAction = parameters => dispatch => {
  dispatch(requestAxios(request.getLessons(parameters)))
    .then(response => {
      dispatch({
        type: GET_LIST_LESSON,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_LIST_LESSON_ERROR,
        payload: {},
        responseError: error
      });
    });
};

export const listLessonReducer = (state: LessonEntity[], action) => {
  const { type, payload = {}, responseError = {} } = action;
  state = { ...state };
  switch (action.type) {
    case GET_LIST_LESSON:
      return payload;
    case GET_LIST_LESSON_ERROR:
      return { ...state, ...payload, responseError };
  }
  return state;
};

export const lessonReducer = (state: LessonEntity = null, action) => {
  const { type, payload = {}, responseError = {} } = action;
  state = { ...state };
  switch (action.type) {
    case CREATE_LESSON:
      return {...state, ...payload};
    case CREATE_LESSON_ERROR:
      return { ...state, ...payload, responseError };
  }
  return state;
};