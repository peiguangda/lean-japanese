import {combineReducers} from 'redux';
import {ApiEntity} from '../common/types/index';
import {apiReducer} from '../redux/api';
import {CourseEntity} from '../common/types/course';
import {reducer as reduxFormReducer} from 'redux-form';
import {listCourseReducer} from './list_course';
import {courseReducer} from './course';
import {LessonEntity} from "../common/types/lesson";
import {lessonReducer, listLessonReducer} from './lesson';
import {ExerciseEntity} from "../common/types/exercise";
import {listExerciseReducer} from "./exercise";
import {currentUserReducer} from "./current_user";
import {UserEntity} from "../common/types/user";
import {memberReducer} from "./member";
import {UserCourseEntity} from "../common/types/user_course";

export interface State {
    api: ApiEntity;
    form: any;
    listCourse: CourseEntity[];
    course: CourseEntity;
    listLesson: LessonEntity[];
    lesson: LessonEntity;
    listExercise: ExerciseEntity[];
    currentUser: UserEntity;
    listMem: UserCourseEntity;
};

export const state = combineReducers<State>({
    api: apiReducer,
    form: reduxFormReducer,
    listCourse: listCourseReducer,
    course: courseReducer,
    listLesson: listLessonReducer,
    lesson: lessonReducer,
    listExercise: listExerciseReducer,
    currentUser: currentUserReducer,
    listMem: memberReducer
});
