/* eslint-disable */
import * as qs  from 'qs';
import {
    assign,
    isEmpty,
    pickBy,
    identity
} from 'lodash';
import { apiConfig } from '../common/constants/config'

export const getDomain = (parameters) => {
    return parameters.$domain ? parameters.$domain : apiConfig['url'];
};

export const getConfig = (parameters) => {
    return parameters.$config ? parameters.$config : {};
};

export const request = (method, url, queryParameters, form, config) => {
    method = method.toLowerCase();
    let keys = Object.keys(queryParameters);
    let queryUrl = url;
    if (keys.length > 0) {
        queryUrl = url + '?' + qs.stringify(queryParameters);
    }
    const defaultConfig = {
        method: method,
        uri: queryUrl,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        json: true
    };

    let mergedConfig;
    if (isEmpty(form)) {
        mergedConfig = assign(defaultConfig, config);
    } else {
        mergedConfig = assign({
            body: form
        }, defaultConfig, config);
    }
    return mergedConfig;
}

function mergeQueryParams(parameters, queryParameters) {
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters)
            .forEach(function(parameterName) {
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
export const getTexts = function(parameters = {}) {
    // let path = '/mock/language.json';
    let path = '/api/getText';
    let queryParameters = { language:'ja' };
    if (parameters['language'] !== undefined && parameters['language'] !== null) {
        queryParameters['language'] = parameters['language'];
    }
    
    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        queryParameters,
        {},
        getConfig(parameters)
    );
}

/**
 * Get jobs
 * @method
 * @name getJobs
 * @param {object} parameters - method options and parameters
 */
export const getCourses = function(parameters = {}) {
    // let path = '/mock/job.json';
    let path = '/api/courses';
    let queryParameters = {
        // pageIndex: 1,
        // selectedOwnerId: null,
        // selectedDepartmentId: null
    };
    let form = {};
    queryParameters = assign(queryParameters, parameters);

    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters)
    );
};

/**
 * Get process
 * @method
 * @name getProcess
 * @param {object} parameters - method options and parameters
 */
export const getProcess = function(parameters = {}) {
    // let path = '/mock/process.json';
    let path = '/api/process';
    let queryParameters = {
        pageIndex: 1,
        selectedOwnerId: null,
        selectedDepartmentId: null,
        listProcessPhaseType:'',
        listOwner:'',
        listPeriodOfTime:''
    };
    let form = {};
    queryParameters = assign(queryParameters, parameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters)
    );
};

/**
 * Get Resume
 * @method
 * @name getResume
 * @param {object} parameters - method options and parameters
 */
export const getResume = function(parameters = {}) {
    let path = '/api/resume';
    let queryParameters = {
        pageIndex: 1,
        selectedOwnerId: null,
        selectedDepartmentId: null
    };
    let form = {};
    queryParameters = assign(queryParameters, parameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters)
    );
};

/**
 * Get setting
 * @method
 * @name getSetting
 * @param {object} parameters - method options and parameters
 */
export const getSetting = function(parameters = {}) {
    // let path = '/mock/setting.json';
    let path = '/api/setting';
    let queryParameters = {};
    let form = {};

    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        queryParameters,
        form,
        getConfig(parameters)
    );
};

/**
 * update setting
 * @method
 * @name updateSetting
 * @param {object} parameters - method options and parameters
 */
export const updateSetting = function(parameters = {}) {
    // let path = '/mock/setting.json';
    let path = '/api/setting';
    let queryParameters = {};
    let form = {...parameters};

    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'POST',
        getDomain(parameters) + path,
        queryParameters,
        form,
        getConfig(parameters)
    );
};

/**
 * Check Is Admin
 * @method
 * @name checkIsAdmin
 * @param {object} parameters - method options and parameters
 */
export const checkIsAdmin = function(parameters = {}) {
    let path = '/api/checkAdmin';
    let queryParameters = {};
    let form = {};

    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        queryParameters,
        form,
        getConfig(parameters)
    );
};