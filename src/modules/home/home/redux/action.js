import {
    ADD_HOME_COUNT,
    REDUCE_HOME_COUNT,
} from './constants'
export const add = () => ({
    type: ADD_HOME_COUNT,
})
export const decrease = () => ({
    type: REDUCE_HOME_COUNT,
})
