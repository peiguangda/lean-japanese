import Cookies from 'js-cookie';

export const setCookie = (name, value) => {
    Cookies.set(name, value);
};

export const removeCookie = name => {
    Cookies.remove(name);
};

export const getCookie = name => {
    return Cookies.get(name);
};

export const setAccessToken = value => {
    setCookie('accessToken', value);
};

export const getAccessToken = () => {
    return getCookie('accessToken');
};

export const removeAccessToken = () => {
    return removeCookie('accessToken');
};

export const setRefreshToken = value => {
    setCookie('refreshToken', value);
};

export const getRefreshToken = () => {
    return getCookie('refreshToken');
};

export const removeRefreshToken = () => {
    removeCookie('refreshToken');
};

export const getLocale = () => {
    return getCookie('locale');
};

export const setLocale = value => {
    setCookie('locale', value);
};
