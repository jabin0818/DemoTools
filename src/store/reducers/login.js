/* 
    1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/

import { Map } from 'immutable'
import * as actionTypes from '../constant'
import { getToken, setToken, clearToken } from '@/utils/localstorage';

const defaultState = Map({
    isVisible: false, //登录框的显示状态
    isLogin: false, // 登录状态
    profile: null,// 用户信息
    token: getToken() || '',
    registerInfo: {},
    registerLoading: false,
})

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_IS_VISIBLE_STATE:
            return state.set('isVisible', action.isVisible)
        case actionTypes.CHANGE_USER_LOGIN_STATE:
            return state.set('isLogin', action.isLogin)
        case actionTypes.CHANGE_PROFILE_INFO:
            return state.set('profile', action.profile)
        case actionTypes.CHANGE_PROFILE_TOKEN:
            return state.set('token', action.token)
        case actionTypes.CHANGE_REGISTER_INFO:
            return state.set('registerInfo', action.registerInfo)
        case actionTypes.CHANGE_REGISTER_LOADING:
            return state.set('registerLoading', action.registerLoading)
        default:
            return state
    }
}

export default reducer
