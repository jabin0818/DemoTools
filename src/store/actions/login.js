/* 
    该文件专门login组件生成action对象
*/
import * as actionTypes from '../constant'
import loginInfo from '@/config/token'
import { getLoginInfo, setLoginInfo } from '@/utils/secret-key'
import { message } from 'antd'
import { byEmailLogin, sendRegister, getUserInfo, userLogout } from '@/service/login';
import { getToken, setToken, clearToken } from '@/utils/localstorage';

// 更改登录框显示
export const changeIsVisible = (visibleState) => ({
    type: actionTypes.CHANGE_IS_VISIBLE_STATE,
    isVisible: visibleState
})

// 更改登录用户信息
export const changeUserProfile = (profileInfo) => ({
    type: actionTypes.CHANGE_PROFILE_INFO,
    profile: profileInfo
})

// 更改登录状态
export const changeUserLoginState = (loginState) => ({
    type: actionTypes.CHANGE_USER_LOGIN_STATE,
    isLogin: loginState
})

// 更改token
export const changeUserLoginToken = (token) => ({
    type: actionTypes.CHANGE_PROFILE_TOKEN,
    token
})

// 更改用户注册表单信息
export const changeUserRegisterInfo = (registerInfo) => ({
    type: actionTypes.CHANGE_REGISTER_INFO,
    registerInfo
})

// 更改注册按钮Loading状态
export const changeRegisterLoading = (registerLoading) => ({
    type: actionTypes.CHANGE_REGISTER_LOADING,
    registerLoading
})

// 登录
export const login = (email, password) => {
    return (dispatch) => {
        message.open({
            key: 'loginMessage',
            type: 'loading',
            content: '加载中...',
        })
        byEmailLogin(email, password).then((res) => {
            console.log("登录的接口：", res)
            message.destroy("loginMessage")
            if (res.code !== 200) {
                message.error('账号或密码错误！')
            } else {
                message.success('登录成功！')
                // 登录成功
                // dispatch(changeUserProfile(res && res.profile))
                // 更改登录状态
                dispatch(changeUserLoginState(true))

                setToken(res.data.token)
                dispatch(changeUserLoginToken(res.data.token))
                // 更改登录状态
                // loginInfo.account = email
                // loginInfo.password = password
                // loginInfo.state = true
                // let newLoginInfo = Object.assign(getLoginInfo('loginInfo'), loginInfo)
                // setLoginInfo('loginInfo', newLoginInfo)
                // 关闭模态框
                dispatch(changeIsVisible(false))
                dispatch(getLoginProfileInfo())
            }
        })
    }
}

// 注册
export const register = (account, password, captchaVerification) => {
    return (dispatch) => {
        dispatch(changeRegisterLoading(true))
        sendRegister(account, password, captchaVerification).then((res) => {
            // console.log(res)
            if (res.code !== 200) {
                message.error(res.msg)
            } else {
                message.success('注册成功,请前往邮箱激活账号')
            }
            dispatch(changeRegisterLoading(false))
        })
    }
}

// 获取用户信息
export const getLoginProfileInfo = () => {
    return (dispatch) => {
        getUserInfo().then((res) => {
            console.log("获取用户信息的接口：", res)
            if (res.code === 200) {
                // 保存登录信息
                dispatch(changeUserProfile(res && res.data))
                // 更改登录状态
                dispatch(changeUserLoginState(true))
                // loginInfo.username = username
                // loginInfo.password = password
                // loginInfo.state = true
                // let newLoginInfo = Object.assign(getLoginInfo('loginInfo'), loginInfo)
                // setLoginInfo('loginInfo', newLoginInfo)
            }
        })
    }
}

// 退出登录
export const logout = () => {
    return (dispatch) => {
        userLogout().then((res) => {
            console.log("退出登录的接口中：", res);
            if (res.code === 200) {
                message.success('退出登录成功！')
                // 保存登录信息
                dispatch(changeUserProfile(null));
                // 更改登录状态
                dispatch(changeUserLoginState(false));
                clearToken();
                // loginInfo.username = username
                // loginInfo.password = password
                // loginInfo.state = true
                // let newLoginInfo = Object.assign(getLoginInfo('loginInfo'), loginInfo)
                // setLoginInfo('loginInfo', newLoginInfo)
            }
        })
    }
}