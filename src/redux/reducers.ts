import { combineReducers } from 'redux';
import { ApiEntity } from '../common/types';
import { apiReducer } from './api';
import { reducer as reduxFormReducer } from 'redux-form';

export interface State {
  api: ApiEntity;
  form: any;
};

export const state = combineReducers<State>({
  api: apiReducer,
  form: reduxFormReducer
});
