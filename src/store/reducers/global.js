import { Map } from 'immutable'
import * as actionTypes from '../constant'
const defaultState = Map({
    isVisible: false, //帮助框的显示状态
    componentsName: '',//帮助框的组件名
})

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_SHOW_HELPMODAL_STATE:
            return state.set('isVisible', action.isVisible)
        case actionTypes.CHANGE_HELPMODAL_COMPONENTSNAME:
            return state.set('componentsName', action.componentsName)
        default:
            return state
    }
}

export default reducer
