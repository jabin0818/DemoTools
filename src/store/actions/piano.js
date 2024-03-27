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

// 更改模式
export const changePianoMode = (mode) => ({
    type: actionTypes.CHANGE_PIANO_MODE,
    mode,
})

// 触发单个音符播放
export const playNoteByNotename = (notename, duration) => ({
    type: actionTypes.CALL_TRIGGERATTACK_FUNCTION,
    notename,
    duration
})

// 更改打字模式结束后的数据
export const changeInputData = ({ speed, correct, time }) => ({
    type: actionTypes.CHANGE_PIANO_TYPEINPUTDATA,
    data: { speed, correct, time },
})

// 更改当前的歌曲 songIndex、songName(打字模式)
export const changeSong = (songName, songIndex) => ({
    type: actionTypes.CHANGE_PIANO_SONG,
    songName,
    songIndex
})

// 更改当前选择的乐谱的id(简谱模式)
export const changeScore = (scoreId) => ({
    type: actionTypes.CHANGE_PIANO_SCORE,
    scoreId
})


// 更改设置
export const changePianoSetting = (data) => ({
    type: actionTypes.CHANGE_PIANO_SETTING,
    data
})