/* 
    该文件专门login组件生成action对象
*/
import * as actionTypes from '../constant'
import loginInfo from '@/config/token'
import { getLoginInfo, setLoginInfo } from '@/utils/secret-key'
import { message } from 'antd'
import { getPicture, reqCheck } from '@/service/captcha';
import { register } from '@/store/actions/login';
// 更改验证码界面的可视状态
export const changeShowCaptchaStatus = (isShow) => ({
    type: actionTypes.CHANGE_SHOW_CAPTCHA_STATE,
    isShow
})

// 更改backImgBase的action
export const changeBackImgBase = (backImgBase) => ({
    type: actionTypes.CHANGE_CAPTCHA_BACKIMGBASE,
    backImgBase
})

// 更改blockBackImgBase的action
export const changeBlockBackImgBase = (blockBackImgBase) => ({
    type: actionTypes.CHANGE_CAPTCHA_BLOCKBACKIMGBASE,
    blockBackImgBase
})

// 更改backToken的action
export const changeBackToken = (backToken) => ({
    type: actionTypes.CHANGE_CAPTCHA_BACKTOKEN,
    backToken
})

// 更改secretKey的action
export const changeSecretKey = (secretKey) => ({
    type: actionTypes.CHANGE_CAPTCHA_SECRETKEY,
    secretKey
})

// 更改checkSuccess的action
export const changeCheckSuccess = (checkSuccess) => ({
    type: actionTypes.CHANGE_CAPTCHA_CHECKSUCCESS,
    checkSuccess
})

// 更改captchaVerification的action
export const changeCaptchaVerification = (captchaVerification) => ({
    type: actionTypes.CHANGE_CAPTCHA_VERIFICATION,
    captchaVerification
})

// 更改isLoading的action
export const changeCaptchaIsLoading = (isLoading) => ({
    type: actionTypes.CHANGE_CAPTCHA_ISLOADING,
    isLoading
})




// 获取验证码图片
export const getPictures = (payload) => {
    return (dispatch) => {
        dispatch(changeCaptchaIsLoading(true))
        getPicture(payload).then((res) => {
            console.log(res)
            if (res.repCode !== "0000") {
                message.error('网络请求失败！')
            } else {
                // message.success('getPicture Success')
                const { repData } = res
                // console.log(repData.jigsawImageBase64)
                dispatch(changeBackImgBase(repData.originalImageBase64))
                dispatch(changeBlockBackImgBase(repData.jigsawImageBase64))
                dispatch(changeBackToken(repData.token))
                dispatch(changeSecretKey(repData.secretKey))
                dispatch(changeCheckSuccess('init'))
                dispatch(changeCaptchaIsLoading(false))
            }
        })
    }
}

// 验证滑块
export const checkPicture = (payload) => {
    return (dispatch, getState) => {
        reqCheck(payload).then((res) => {
            console.log(res)
            const captchaVerification = payload.captchaVerification;

            if (res.repCode !== "0000") {
                message.error('网络请求失败！')
                dispatch(changeCheckSuccess('failure'))
            } else {
                // message.success('验证成功！')
                console.log('验证成功！')
                console.log(getState().loginState.get("registerInfo"))
                let account = getState().loginState.get("registerInfo").account
                let password = getState().loginState.get("registerInfo").password
                dispatch(changeCheckSuccess('success'))
                dispatch(changeCaptchaVerification(captchaVerification))
                dispatch(register(account, password, captchaVerification))
                // return new Promise(res.repData.captchaVerification) 
                // return Promise.resolve(res.repData.captchaVerification) 
            }
        })
    }
}