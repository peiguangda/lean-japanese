import { LessonEntity } from "./types";
import * as request from "../../../../api/request";
import { requestAxios } from "../../../../redux/api";

export const CREATE_LESSON = "course/CREATE_LESSON";
export const CREATE_LESSON_ERROR = "course/CREATE_LESSON_ERROR";

export const createLessonAction = parameters => dispatch => {
  dispatch(requestAxios(request.createLesson(parameters)))
    .then(response => {
      dispatch({
        type: CREATE_LESSON,
        payload: response
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_LESSON_ERROR,
        payload: {},
        responseError: error
      });
    });
};

export const lessonReducer = (state: LessonEntity = null, action) => {
  const { type, payload = {}, responseError = {} } = action;
  state = { ...state, actionType: action.type };
  switch (action.type) {
    case CREATE_LESSON:
      return { ...state, ...payload, responseError };
    case CREATE_LESSON_ERROR:
      return { ...state, ...payload, responseError };
  }

  return state;
};
