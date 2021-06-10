/**
 * @summary 注册Object.assign2()
 * @constructor
 */
export function InjectObjAssign() {


    //@ts-ignore
    if (typeof Object.assign2 != 'function') {


        Object.defineProperty(Object, 'assign2', {
            value: function (target: any) {
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object')
                }

                var to = Object(target)
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index]
                    if (nextSource !== null) {
                        // for..in 遍历对象获取属性值，会检查其原型链上的属性
                        for (var nextKey in nextSource) {
                            // 判断对象中的是否有nextkey 为name的属性
                            // 过滤掉原型链上面的属性
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey]
                            }
                        }
                    }
                }
                return to
            },
            writable: true,
            configurable: true
        })
    }
}




/**
 * @summary 用于判断对象
 * @param obj
 *
 *  只保留对象 Object.prototype.toString.call(obj) === '[object Object]'
 *  兼容数组的判断 typeof obj === 'object' && obj != null，typeof null //"object"
 *  typeof {} //"object"
 *  typeof [] //"object"
 *  typeof function foo(){} //"function" (特殊情况)
 */
function isObject(obj: object) {

    return typeof obj === 'object' && obj != null
}

/**
 * @summary 递归式深拷贝
 * @param source 深拷贝原对象
 * @param hash  哈希存储对象
 */
export function deepCopy(source: object, hash = new WeakMap()) {

    // 为解决数组的兼容
    if (!isObject(source)) return source

    if (hash.has(source)) return hash.get(source)

    let target = Array.isArray(source) ? [] : {}

    hash.set(source, target)


    //symbols 方法兼容
    let symKeys = Object.getOwnPropertySymbols(source);
    if (symKeys.length) {
        symKeys.forEach(symKeys => {

            if (isObject(source[symKeys])) {
                target[symKeys] = deepCopy(source[symKeys], hash)
            } else {
                target[symKeys] = source[symKeys]
            }
        })
    }


    // for..in 遍历对象获取属性值，会检查其原型链上的属性
    for (var nextKey in source) {
        // 判断对象中的是否有nextkey 为name的属性
        // 过滤掉原型链上面的属性
        if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            if (isObject(source[nextKey])) {

                target[nextKey] = deepCopy(source[nextKey], hash)

            } else {

                target[nextKey] = source[nextKey]
            }
        }
    }

    return target
}

/**
 * @summary 循环的深拷贝 。用于解决递归的数组爆破
 * @param source 深拷贝原对象
 */
export function deepCopy2(source: object) {
    // =============
    const uniqueList = []; // 用来去重
    // =============

    let root = {};

    // 循环数组
    const loopList: Array<any> = [
        {
            parent: root,
            key: undefined,
            data: source,
        }
    ];

    while (loopList.length) {
        // 深度优先
        const node: any = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        // =============
        // 数据已经存在
        let uniqueData = find(uniqueList, data);
        if (uniqueData) {
            parent[key] = uniqueData.target;
            break; // 中断本次循环
        }

        // 数据不存在
        // 保存源数据，在拷贝数据中对应的引用
        uniqueList.push({
            source: data,
            target: res,
        });
        // =============

        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

/**
 * @summary 递归式深拷贝，采用Reflect 查找对象的键和值
 * @param source
 * @param hash
 */
export function deepCopy3(source: any, hash = new WeakMap()) {

    if (!isobj(source)) return source
    if (hash.has(source)) return hash.get(source)

    let target = Array.isArray(source) ? [...source] : {...source}
    hash.set(source, target)


    Reflect.ownKeys(target).forEach((key) => {
        if (isobj(source[key])) {

            target[key] = deepCopy3(source[key], hash)
        } else {
            target[key] = source[key]
        }
    })

    return target
}


function find(arr: string | any[], item: any) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }

    return null;
}

function isobj(obj: object) {
    return typeof obj === 'object' && obj != null
}

