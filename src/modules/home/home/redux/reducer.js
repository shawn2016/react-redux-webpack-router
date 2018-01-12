import { injectReducer } from 'reduxes/reducers'
import {
    ADD_HOME_COUNT,
    REDUCE_HOME_COUNT,
} from './constants'
const initState = {
    count: 0,
}
export function computed(state = initState, action) {
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
            return { ...state }
    }
}
injectReducer(computed, 'demo')