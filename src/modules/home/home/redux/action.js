import {
    ADD,
    DECREASE
} from './constants'
export const add = (params) => ({
    callApi: {
        type: ADD,
        path: '/payment/order/getInfo',
        method: 'POST',
        param: params
    }
})
export const decrease = (params) => ({
    callApi: {
        type: DECREASE,
        path: '/payment/order/getInfo',
        method: 'POST',
        param: params
    }
})