/* eslint-disable */import * as qs from 'qs';import {assign, identity, isEmpty, pickBy} from 'lodash';import {apiConfig} from '../common/constants/config';import * as Cookie from "../helpers/Cookie.js";export const getDomain = (parameters) => {    return parameters.$domain ? parameters.$domain : apiConfig['url-api'];};export const getConfig = (parameters) => {    return parameters.$config ? parameters.$config : {};};export const getAccessToken = () => {    return Cookie.getAccessToken() ? Cookie.getAccessToken() : "";}export const request = (method, url, queryParameters, form, config, authen_token) => {    method = method.toLowerCase();    let keys = Object.keys(queryParameters);    let queryUrl = url;    if (keys.length > 0) {        queryUrl = url + '?' + qs.stringify(queryParameters);    }    const defaultConfig = {        method: method,        uri: queryUrl,        headers: {            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',            'Authorization': authen_token        },        json: true    };    let mergedConfig;    if (isEmpty(form)) {        mergedConfig = assign(defaultConfig, config);    } else {        mergedConfig = assign({            form        }, defaultConfig, config);    }    console.log("merged config", mergedConfig);    return mergedConfig;}function mergeQueryParams(parameters, queryParameters) {    if (parameters.$queryParameters) {        Object.keys(parameters.$queryParameters)            .forEach(function (parameterName) {                let parameter = parameters.$queryParameters[parameterName];                queryParameters[parameterName] = parameter;            });    }    return queryParameters;}/** * Get texts * @method * @name getTexts * @param {object} parameters - method options and parameters */export const getTexts = function (parameters = {}) {    // let path = '/mock/language.json';    let path = '/api/getText';    let queryParameters = {language: 'ja'};    if (parameters['language'] !== undefined && parameters['language'] !== null) {        queryParameters['language'] = parameters['language'];    }    queryParameters = mergeQueryParams(parameters, queryParameters);    return request(        'GET',        getDomain(parameters) + path,        queryParameters,        {},        getConfig(parameters),        null    );}/** * Post create course * @method * @name createCourse * @param {object} parameters - method options and parameters */export const createCourse = function (parameters) {    let path = '/api/courses/';    let queryParameters = {}; //page=? or parameter sau path    let form = {course: parameters};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'POST',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Get courses * @method * @name getCourses * @param {object} parameters - method options and parameters */export const getCourses = function (parameters = {}) {    let token = getAccessToken();    let path = '/api/courses';    let queryParameters = {}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),        form,        getConfig(parameters),        authen_token    );};/** * Get course detail * @method * @name showCourse * @param {object} parameters - method options and parameters */export const showCourse = function (parameters: { id: number }) {    let path = '/api/courses/' + parameters.id;    let queryParameters = {}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),        form,        getConfig(parameters),        authen_token    );};/** * Get lessons * @method * @name getLessons * @param {object} parameters - method options and parameters */export const getLessons = function (parameters) {    let path = '/api/topics/';    let queryParameters = {course_id: parameters.course_id, topic: {parent_id: parameters.parent_id}}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),        form,        getConfig(parameters),        authen_token    );};/** * Post create lesson * @method * @name createLesson * @param {object} parameters - method options and parameters */export const createLesson = function (parameters) {    let path = '/api/topics/';    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path    let form = {topic: parameters};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'POST',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Delete delete lesson * @method * @name deleteLesson * @param {object} parameters - method options and parameters */export const deleteLesson = function (parameters) {    let path = '/api/topics/' + parameters.id;    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'DELETE',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Edit edit lesson * @method * @name editLesson * @param {object} parameters - method options and parameters */export const editLesson = function (parameters) {    let path = '/api/topics/' + parameters.id;    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path    let form = {topic: parameters};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'PUT',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Get lesson detail * @method * @name showLesson * @param {object} parameters - method options and parameters */export const showLesson = function (parameters) {    let path = '/api/topics/' + parameters.id;    let queryParameters = {}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),        form,        getConfig(parameters),        authen_token    );};/** * Get Exercises * @method * @name getExercises * @param {object} parameters - method options and parameters */export const getExercises = function (parameters) {    let path = '/api/cards/';    let queryParameters = {topic_id: parameters.topic_id}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),        form,        getConfig(parameters),        authen_token    );};/** * Post create exercise * @method * @name createExercise * @param {object} parameters - method options and parameters */export const createExercise = function (parameters) {    let path = '/api/cards/';    let queryParameters = {}; //page=? or parameter sau path    let form = {card: parameters};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'POST',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Delete delete exercise * @method * @name deleteExercise * @param {object} parameters - method options and parameters */export const deleteExercise = function (parameters) {    let path = '/api/cards/' + parameters.id;    let queryParameters = {}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'DELETE',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Edit edit exercise * @method * @name editExercise * @param {object} parameters - method options and parameters */export const editExercise = function (parameters) {    let path = '/api/cards/' + parameters.id;    let queryParameters = {topic_id: parameters.topic_id}; //page=? or parameter sau path    let form = {card: parameters};      //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'PUT',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Get exercise detail * @method * @name showExercise * @param {object} parameters - method options and parameters */export const showExercise = function (parameters) {    let path = '/api/cards/' + parameters.id;    let queryParameters = {}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),        form,        getConfig(parameters),        authen_token    );};/** * Post create session * @method * @name createSession * @param {object} parameters - method options and parameters */export const createSession = function (parameters) {    let path = '/api/sessions';    let queryParameters = {}; //page=? or parameter sau path    let form = {session: parameters};            //body    let authen_token;  //sau se get tu localstorage    return request(        'POST',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Delete delete session * @method * @name deleteSession * @param {object} parameters - method options and parameters */export const deleteSession = function (parameters) {    let path = '/api/sessions/1';    let queryParameters = {}; //page=? or parameter sau path    let form = {session: parameters};            //body    let authen_token = getAccessToken();    return request(        'DELETE',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Get user * @method * @name get profile * @param {object} parameters - method options and parameters */export const getProfile = function (parameters) {    let path = '/api/profile';    let queryParameters = {}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Get user * @method * @name get profile * @param {object} parameters - method options and parameters */export const getMemAttendCourse = function (parameters) {    let path = '/api/user_courses';    let queryParameters = {user_course: {course_id: parameters.course_id}}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Post create card progress * @method * @name createCardProgress * @param {object} parameters - method options and parameters */export const createCardProgress = function (parameters) {    let path = '/api/card_progresses/';    let queryParameters = {}; //page=? or parameter sau path    let form = {card_progresses: parameters};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'POST',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};/** * Get card progresses * @method * @name getCardProgresses * @param {object} parameters - method options and parameters */export const getCardProgresses = function (parameters) {    let path = '/api/card_progresses';    let queryParameters = {topic_id: parameters.topic_id}; //page=? or parameter sau path    let form = {};            //body    let authen_token = getAccessToken();  //sau se get tu localstorage    return request(        'GET',        getDomain(parameters) + path,        pickBy(queryParameters, identity),  //phan trang cac kieu        form,        getConfig(parameters),        authen_token    );};