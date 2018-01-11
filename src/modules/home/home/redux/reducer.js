import {
    ADD,
    DECREASE
} from './constants'
const computed = (state = 0, action) => {
    switch (action.type) {
        case ADD:
            return state + 1
        case DECREASE:
            return state - 1
        default:
            return state
    }
}