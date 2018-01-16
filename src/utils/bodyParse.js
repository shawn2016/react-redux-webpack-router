export default (body, dataType = 'json') => {
    if (Object.prototype.toString.call(body) !== '[object Object]') {
        return ''
    }
    if (dataType === 'json') {
        return JSON.stringify(body)
    }
    return Object.keys(body).map(key => {
        let value = body[key]
        value = JSON.stringify(value)
        value = encodeURIComponent(value)
        return `${key}=${value}`
    }).join('&')
}