/* 
    定义action对象中type类型的常量值
*/

//login模块的type常量
export const CHANGE_IS_VISIBLE_STATE = 'login/CHANGE_VISIBLE_LOGIN_STATE' //更改登录框可视状态
export const CHANGE_USER_LOGIN_STATE = 'login/CHANGE_USER_LOGIN_STATE' //更改用户登录状态
export const CHANGE_PROFILE_INFO = 'login/CHANGE_PROFILE_INFO' //更改登录用户信息
export const CHANGE_PROFILE_TOKEN = 'login/CHANGE_PROFILE_TOKEN' //更改登录状态(token)
export const CHANGE_REGISTER_INFO = 'login/CHANGE_REGISTER_INFO' //更改用户注册表单信息
export const CHANGE_REGISTER_LOADING = 'login/CHANGE_REGISTER_LOADING' //更改注册按钮Loading状态

//slider滑块验证模块的type常量
export const CHANGE_SHOW_CAPTCHA_STATE = 'slider/CHANGE_SHOW_CAPTCHA_STATE' //更改验证码界面的可视状态
export const CHANGE_CAPTCHA_BACKIMGBASE = 'slider/CHANGE_CAPTCHA_BACKIMGBASE' //更改backImgBase的action
export const CHANGE_CAPTCHA_BLOCKBACKIMGBASE = 'slider/CHANGE_CAPTCHA_BLOCKBACKIMGBASE' //更改blockBackImgBase的action
export const CHANGE_CAPTCHA_BACKTOKEN = 'slider/CHANGE_CAPTCHA_BACKTOKEN' //更改backToken的action
export const CHANGE_CAPTCHA_SECRETKEY = 'slider/CHANGE_CAPTCHA_SECRETKEY' //更改secretKey的action
export const CHANGE_CAPTCHA_CHECKSUCCESS = 'slider/CHANGE_CAPTCHA_CHECKSUCCESS' //更改checkSuccess的action
export const CHANGE_CAPTCHA_VERIFICATION = 'slider/CHANGE_CAPTCHA_VERIFICATION' //更改captchaVerification的action
export const CHANGE_CAPTCHA_ISLOADING = 'slider/CHANGE_CAPTCHA_ISLOADING' //更改isLoading的action

export const GET_CAPTCHA_PICTURE = 'slider/GET_CAPTCHA_PICTURE' //获取验证码图片
export const CHECK_CAPTCHA_PICTURE = 'slider/CHECK_CAPTCHA_PICTURE' //验证滑块

//global模块的type常量
export const CHANGE_SHOW_HELPMODAL_STATE = `global/CHANGE_SHOW_HELPMODAL_STATE` //更改帮助模态框的可视状态
export const CHANGE_HELPMODAL_COMPONENTSNAME = `global/CHANGE_HELPMODAL_COMPONENTSNAME` //更改帮助模态框的组件名

//piano模块的type常量
export const CHANGE_PIANO_MODE = `piano/CHANGE_PIANO_MODE` //更改mode
export const CALL_TRIGGERATTACK_FUNCTION = `piano/CALL_TRIGGERATTACK_FUNCTION` //playNote触发单个音符播放
export const CHANGE_PIANO_TYPEINPUTDATA = `piano/CHANGE_PIANO_TYPEINPUTDATA` //更改打字模式结束后的数据
export const CHANGE_PIANO_SONG = `piano/CHANGE_PIANO_SONG` //更改song相关数据songIndex、songName
export const CHANGE_PIANO_SCORE = `piano/CHANGE_PIANO_SCORE` //更改当前选择的乐谱(简谱模式)
export const CHANGE_PIANO_SETTING = `piano/CHANGE_PIANO_SETTING` //更改设置

export const CHANGE_PIANO_THISLINEFIRSTINDEX = `piano/CHANGE_PIANO_THISLINEFIRSTINDEX` //更改thisLineFirstIndex
export const CHANGE_PIANO_CURRENTINDEX = `piano/CHANGE_PIANO_CURRENTINDEX` //更改currentIndex
export const RESET_PIANO_THISLINEFIRSTINDEX = `piano/RESET_PIANO_THISLINEFIRSTINDEX` //重置thisLineFirstIndex