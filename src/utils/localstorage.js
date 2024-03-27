/**
 * 主题切换
 * @param {String} themeIsLight
 * @returns {String} 
 */
export const getThemeIsLight = () => {
    return localStorage.getItem('themeIsLight');
}
export const setThemeIsLight = (themeIsLight) => {
    localStorage.setItem('themeIsLight', themeIsLight);
}
export const clearThemeIsLight = () => {
    localStorage.removeItem('themeIsLight');
}

/**
 * locationId 用于获取城市信息
 * @param {String}
 * @returns {Array}
 */
export const getLocalInfo = () => {
    return JSON.parse(localStorage.getItem('localInfo') || '{}');
}
export const setLocalInfo = (localInfo) => {
    localStorage.setItem('localInfo', JSON.stringify(localInfo));
}
export const clearLocalInfo = () => {
    localStorage.removeItem('localInfo');
}

//token
export const getToken = () => {
    return localStorage.getItem('token');
}
export const setToken = (token) => {
    localStorage.setItem('token', token);
}
export const clearToken = () => {
    localStorage.removeItem('token');
}

// 汉字打字练习卡片的模式（五笔or拼音）
export const getDictCardModel = () => {
    return localStorage.getItem('dictCardModel');
}
export const setDictCardModel = (model) => {
    localStorage.setItem('dictCardModel', model);
}
export const clearDictCardModel = () => {
    localStorage.removeItem('dictCardModel');
}