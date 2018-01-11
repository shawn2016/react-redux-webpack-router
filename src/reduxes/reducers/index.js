import { combineReducers } from 'redux'
import api from './api'

let obj = { api },
    _store = null

let rootReducer = combineReducers(obj)

const createReducers = (reducers, key) => {
    let newReducer = {}
    newReducer[key] = reducers
    combineReducers(obj)
    obj = Object.assign(obj, newReducer)
    return combineReducers(obj)
}

export const injectReducer = (reducers, key) => {
    _store.replaceReducer(createReducers(reducers, key))
}

export const injectStore = store => _store = store

export default rootReducer
