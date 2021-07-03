export function isEmptyFunction(func: any) {

    if (typeof func != 'function') {
        return false
    }
    let str = func.toString().replace(/\s+/g, '')
    str = str.match(/{.*}/g)[0]
    return str === '{}'

}

/**
 * @deprecated 获取请求回来的data
 * @param res
 */
export function getResponseData(res: { [key: string]: any }) {
    const codeMap: Map<number, any> = new Map([
        [0, (res: { [key: string]: any }) => res.data.data],
        [-1, (res: { [key: string]: any }) => {
            return {success: -1, message: res.data.message}
        }],
        [-2, (res: { [key: string]: any }) => {
            return {success: -1, message: '用户信息异常'}
        }],
        [-3, (res: { [key: string]: any }) => {
            return {success: -1, message: '系统异常'}
        }],
        [-666, (res: { [key: string]: any }) => {
            return {success: -1, message: '用户登陆过期'}
        }]
    ])

    try {
        const data = res.data ? res.data : null
        const code: number = data.code
        return codeMap.get(code)(res)

    } catch (e) {
        return null
    }

}
