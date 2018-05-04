/** @format */

import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { ADD_HOME_COUNT, REDUCE_HOME_COUNT, DESP_GETACCOUNTDATA } from './constants'
const initState = {
  count: 0,
}
const computed = (state = initState, action) => {
  switch (action.type) {
    case ADD_HOME_COUNT:
      return {
        ...state,
        count: state.count + 1,
      }
    case REDUCE_HOME_COUNT:
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return {
        ...state,
      }
  }
}
const DESP_accountData = (state = {}, action) => {
  switch (action.type) {
    case DESP_GETACCOUNTDATA:
      return action
    default:
      return state
  }
}
const reducerList = combineReducers({
  DESP_accountData,
  computed,
})
injectReducer(reducerList, 'demo')
