/* 
    汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import { combineReducers } from 'redux'

//引入为组件服务的reducer
import login from './login'
import slider from './slider'
import global from './global'
import piano from './piano'

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
    loginState: login,
    sliderState: slider,
    globalState: global,
    pianoState: piano,
})
