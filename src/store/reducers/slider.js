/* 
    1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
    滑块验证
*/

import { Map } from 'immutable'
import * as actionTypes from '../constant'
const defaultState = Map({
    isLoading: false,
    // 是否显示验证框
    isShow: false,
    captchaVerification: '',
    checkSuccess: 'init',
    backToken: '', //后端返回的唯一token值
    secretKey: '', //后端返回的加密秘钥 字段
    blockBackImgBase: '', //验证滑块的背景图片
    backImgBase: '', //验证码背景图片
    // secretKey,
    // dispatch,
    // blockBackImgBase,
    //iconColor,
    //iconClass,
    //tipWords,
    //passFlag,
    //backImgBase,
    setSize: {
        imgHeight: 155,
        imgWidth: 330,
        barHeight: 40,
        barWidth: 310,
    },
    vSpace: 5,
    barSize: {
        width: '310px',
        height: '40px',
    },

    //passFlag: false, //是否通过的标识

    // startMoveTime: '', //移动开始的时间
    // endMovetime: '', //移动结束的时间
    // tipsBackColor: '', //提示词的背景颜色
    // tipWords: '提示词的背景颜色',
    // text: '',
    // finishText: '',

    // top: 0,
    // left: 0,
    // moveBlockLeft: undefined,
    // leftBarWidth: undefined,
    // // 移动中样式
    // moveBlockBackgroundColor: undefined,
    // leftBarBorderColor: '#ddd',
    // // iconColor: undefined,
    // iconColor: '#000',
    // iconClass: 'icon-right',
    // status: false, //鼠标状态
    // isEnd: false, //是够验证完成
    // showRefresh: true,
    // transitionLeft: '',
    // transitionWidth: '',
    // //其他属性
    // captchaType: '',
    // type: '1',
    // //弹出式pop，固定fixed
    // mode: 'fixed',

    // explain: '向右滑动完成验证',
    imgSize: {
        width: '330px',
        height: '155px',
    }
})

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_SHOW_CAPTCHA_STATE:
            return state.set('isShow', action.isShow)
        case actionTypes.CHANGE_CAPTCHA_BACKIMGBASE:
            return state.set('backImgBase', action.backImgBase)
        case actionTypes.CHANGE_CAPTCHA_BLOCKBACKIMGBASE:
            return state.set('blockBackImgBase', action.blockBackImgBase)
        case actionTypes.CHANGE_CAPTCHA_BACKTOKEN:
            return state.set('backToken', action.backToken)
        case actionTypes.CHANGE_CAPTCHA_SECRETKEY:
            return state.set('secretKey', action.secretKey)
        case actionTypes.CHANGE_CAPTCHA_CHECKSUCCESS:
            return state.set('checkSuccess', action.checkSuccess)
        case actionTypes.CHANGE_CAPTCHA_VERIFICATION:
            return state.set('captchaVerification', action.checkSuccess)
        case actionTypes.CHANGE_CAPTCHA_ISLOADING:
            return state.set('isLoading', action.isLoading)
        default:
            return state
    }
}

export default reducer
