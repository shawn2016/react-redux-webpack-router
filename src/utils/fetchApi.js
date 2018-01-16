import fetch from 'isomorphic-fetch'
import bodyParse from './bodyParse'
/**
 * @param {*} url 请求地址
 * @param {*} option 请求参数
 * @param {*} dataType 数据类型
 */
const DEFAULT_OPTION = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    // mode: 'no-cors',
    credentials: 'include',
    body: {},
}
let api = 'https://www.easy-mock.com/mock/59ccb5fda0ab222a113a7f55/example_1506588157942'
export default function fetchApi(url, option = {}, dataType = 'json') {
    console.log(dataType, option)
    let rawOption = option || {}

    const realOption = Object.assign(
        DEFAULT_OPTION,
        option,
    )

    let x
    if (realOption.body && realOption.body.body) {
        for (x in realOption.body.body) {
            if (realOption.body.body[x] === '') realOption.body.body[x] = null
        }
    }

    if (realOption.method === 'POST') {
        realOption.body = bodyParse(realOption.body)
    }

    rawOption.headers = Object.assign(
        DEFAULT_OPTION.headers,
        option.headers,
    )

    return new Promise(async (reslove, reject) => {
        // 捕获 async await 的异常
        try {
            let realUrl = api + url
            if (url.indexOf('.json') > 0) {
                realUrl = url
            }
            const res = await fetch(realUrl, realOption)
            console.log(res)
            if (res.ok) {
                if (dataType.toUpperCase() === 'TEXT') {
                    const text = await res.text()
                    reslove(text)
                } else if (dataType.toUpperCase() === 'JSON') {
                    const json = await res.json()
                    console.log(json)
                    reslove(json)
                } else if (dataType.toUpperCase() === 'BLOB') {
                    const blob = await res.blob()
                    reslove(blob)
                }
            } else {
                reject(res)
            }
        } catch (err) {
            reject(err)
        }
    })
}