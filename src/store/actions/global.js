import * as actionTypes from '../constant'

// 更改帮助框显示
export const changeHelpIsVisible = (isVisible) => ({
    type: actionTypes.CHANGE_SHOW_HELPMODAL_STATE,
    isVisible
})
// 更改帮助框组件名
export const changeHelpComponentsName = (componentsName) => ({
    type: actionTypes.CHANGE_HELPMODAL_COMPONENTSNAME,
    componentsName
})