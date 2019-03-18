import { combineReducers } from 'redux';
import { ApiEntity } from '../common/types';
import { apiReducer } from './api';
import { CourseEntity } from '../modules/home/components/courses/types';
import { reducer as reduxFormReducer } from 'redux-form';
import { courseReducer } from '../modules/home/components/courses/reducer'

export interface State {
  api: ApiEntity;
  form: any;
  course: CourseEntity;
};

export const state = combineReducers<State>({
  api: apiReducer,
  form: reduxFormReducer,
  course: courseReducer
});
