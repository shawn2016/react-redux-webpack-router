import utils from 'utils'
export default () => next => action => {
    let { callApiParam } = action
    if (!callApiParam || typeof callApiParam === 'function') {
        return next(action)
    }
    return utils.callApi(callApiParam).then(
        res => {
            next(res)
            return res
        },
        err => {
            console.log(err)
        },
    ).catch(err => {
        console.log(err)
    })
}