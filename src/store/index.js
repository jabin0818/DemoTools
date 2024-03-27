/*
    暴露一个store
*/

import { legacy_createStore as createStore, applyMiddleware } from 'redux'

import countReducer from './reducers'

//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
export default createStore(countReducer, composeWithDevTools(applyMiddleware(thunk)))