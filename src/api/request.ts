/* eslint-disable */
import * as qs from 'qs';
import {
    assign,
    isEmpty,
    pickBy,
    identity
} from 'lodash';
import {apiConfig} from '../common/constants/config';

export const getDomain = (parameters) => {
    return parameters.$domain ? parameters.$domain : apiConfig['url-api'];
};

export const getConfig = (parameters) => {
    return parameters.$config ? parameters.$config : {};
};

export const request = (method, url, queryParameters, form, config, authen_token) => {
    method = method.toLowerCase();
    let keys = Object.keys(queryParameters);
    let queryUrl = url;
    if (keys.length > 0) {
        queryUrl = url + '?' + qs.stringify(queryParameters);
    }
    const defaultConfig = {
        method: method,
        uri: queryUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': authen_token
        },
        json: true
    };

    let mergedConfig;
    if (isEmpty(form)) {
        mergedConfig = assign(defaultConfig, config);
    } else {
        mergedConfig = assign({
            form
        }, defaultConfig, config);
    }
    console.log("merged config", mergedConfig);
    return mergedConfig;
}

function mergeQueryParams(parameters, queryParameters) {
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters)
            .forEach(function (parameterName) {
                let parameter = parameters.$queryParameters[parameterName];
                queryParameters[parameterName] = parameter;
            });
    }
    return queryParameters;
}

/**
 * Get texts
 * @method
 * @name getTexts
 * @param {object} parameters - method options and parameters
 */
export const getTexts = function (parameters = {}) {
    // let path = '/mock/language.json';
    let path = '/api/getText';
    let queryParameters = {language: 'ja'};
    if (parameters['language'] !== undefined && parameters['language'] !== null) {
        queryParameters['language'] = parameters['language'];
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        queryParameters,
        {},
        getConfig(parameters),
        null
    );
}

/**
 * Get courses
 * @method
 * @name getCourses
 * @param {object} parameters - method options and parameters
 */
export const getCourses = function (parameters = {}) {
    let path = '/api/courses';
    let queryParameters = {}; //page=? or parameter sau path
    let form = {};            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters),
        authen_token
    );
};

/**
 * Get course detail
 * @method
 * @name showCourse
 * @param {object} parameters - method options and parameters
 */
export const showCourse = function (parameters: { id: number }) {
    let path = '/api/courses/' + parameters.id;
    let queryParameters = {}; //page=? or parameter sau path
    let form = {};            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters),
        authen_token
    );
};

/**
 * Get lessons
 * @method
 * @name getLessons
 * @param {object} parameters - method options and parameters
 */
export const getLessons = function (parameters) {
    let path = '/api/topics/';
    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path
    let form = {};            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters),
        authen_token
    );
};

/**
 * Post create lesson
 * @method
 * @name createLesson
 * @param {object} parameters - method options and parameters
 */
export const createLesson = function (parameters) {
    let path = '/api/topics/';
    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path
    let form = {topic: parameters};            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'POST',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),  //phan trang cac kieu
        form,
        getConfig(parameters),
        authen_token
    );
};

/**
 * Delete delete lesson
 * @method
 * @name deleteLesson
 * @param {object} parameters - method options and parameters
 */
export const deleteLesson = function (parameters) {
    let path = '/api/topics/' + parameters.id;
    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path
    let form = {};            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'DELETE',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),  //phan trang cac kieu
        form,
        getConfig(parameters),
        authen_token
    );
};

/**
 * Edit edit lesson
 * @method
 * @name editLesson
 * @param {object} parameters - method options and parameters
 */
export const editLesson = function (parameters) {
    let path = '/api/topics/' + parameters.id;
    let queryParameters = {course_id: parameters.course_id}; //page=? or parameter sau path
    let form = {topic: parameters}            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'PUT',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),  //phan trang cac kieu
        form,
        getConfig(parameters),
        authen_token
    );
};

/**
 * Get lesson detail
 * @method
 * @name showLesson
 * @param {object} parameters - method options and parameters
 */
export const showLesson = function (parameters) {
    let path = '/api/topics/' + parameters.id;
    let queryParameters = {}; //page=? or parameter sau path
    let form = {};            //body
    let authen_token = 'mhU1MY19DyRxrs_ifsZp';  //sau se get tu localstorage
    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters),
        authen_token
    );
};
// /**
//  * Get process
//  * @method
//  * @name getProcess
//  * @param {object} parameters - method options and parameters
//  */
// export const getProcess = function (parameters = {}) {
//     // let path = '/mock/process.json';
//     let path = '/api/process';
//     let queryParameters = {
//         pageIndex: 1,
//         selectedOwnerId: null,
//         selectedDepartmentId: null,
//         listProcessPhaseType: '',
//         listOwner: '',
//         listPeriodOfTime: ''
//     };
//     let form = {};
//     queryParameters = assign(queryParameters, parameters);
//     return request(
//         'GET',
//         getDomain(parameters) + path,
//         pickBy(queryParameters, identity),
//         form,
//         getConfig(parameters)
//     );
// };
//
// /**
//  * Get Resume
//  * @method
//  * @name getResume
//  * @param {object} parameters - method options and parameters
//  */
// export const getResume = function (parameters = {}) {
//     let path = '/api/resume';
//     let queryParameters = {
//         pageIndex: 1,
//         selectedOwnerId: null,
//         selectedDepartmentId: null
//     };
//     let form = {};
//     queryParameters = assign(queryParameters, parameters);
//     return request(
//         'GET',
//         getDomain(parameters) + path,
//         pickBy(queryParameters, identity),
//         form,
//         getConfig(parameters)
//     );
// };
//
// /**
//  * Get setting
//  * @method
//  * @name getSetting
//  * @param {object} parameters - method options and parameters
//  */
// export const getSetting = function (parameters = {}) {
//     // let path = '/mock/setting.json';
//     let path = '/api/setting';
//     let queryParameters = {};
//     let form = {};
//
//     queryParameters = mergeQueryParams(parameters, queryParameters);
//     return request(
//         'GET',
//         getDomain(parameters) + path,
//         queryParameters,
//         form,
//         getConfig(parameters)
//     );
// };
//
// /**
//  * update setting
//  * @method
//  * @name updateSetting
//  * @param {object} parameters - method options and parameters
//  */
// export const updateSetting = function (parameters = {}) {
//     // let path = '/mock/setting.json';
//     let path = '/api/setting';
//     let queryParameters = {};
//     let form = {...parameters};
//
//     queryParameters = mergeQueryParams(parameters, queryParameters);
//     return request(
//         'POST',
//         getDomain(parameters) + path,
//         queryParameters,
//         form,
//         getConfig(parameters)
//     );
// };
//
// /**
//  * Check Is Admin
//  * @method
//  * @name checkIsAdmin
//  * @param {object} parameters - method options and parameters
//  */
// export const checkIsAdmin = function (parameters = {}) {
//     let path = '/api/checkAdmin';
//     let queryParameters = {};
//     let form = {};
//
//     queryParameters = mergeQueryParams(parameters, queryParameters);
//     return request(
//         'GET',
//         getDomain(parameters) + path,
//         queryParameters,
//         form,
//         getConfig(parameters)
//     );
// };