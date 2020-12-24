import {parseScript} from 'esprima';
import {Pattern} from 'estree'
import CreateIoc from "./ioc";

import 'reflect-metadata';

const container = new CreateIoc()

interface ITypes {
    [key: string]: Symbol
}

const TYPES: ITypes = {
    indexService: Symbol.for('indexService'),
};

interface IIndexService {
    log(str: string): void;
}

class IndexServie implements IIndexService {

    public log(str: string): void {
        console.log(str)
    }
}

container.bind(TYPES.indexService, () => new IndexServie())

//获取函数的参数
function getParmas(fn: Function) {
    const ast = parseScript(fn.toString());
    const node: any = ast.body[0]
    const lastnode = node.body.body[0].value
    let fnParms: Pattern[] = []

    if (lastnode.type === 'FunctionExpression') {
        fnParms = lastnode.params
    }
    let vaildParams: string[] = []
    console.log("fnParms===", fnParms);
    fnParms.forEach((obj) => {
        if (obj.type === 'Identifier') {
            vaildParams.push(obj.name)
        }
    })
    console.log("vaildParams===", vaildParams);
    return vaildParams
}

//判读一个对象是否有对应的key
// hasOwnProperty for in 的读写屏障
function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
    return obj.hasOwnProperty(key)
}


// {} object 代码块 函数体。。

function controller<T extends { new(...args: any[]): {} }>(constructor: T) {
    class Controller extends constructor {
        constructor(...args: any[]) {
            super(args);
            const _params = getParmas(constructor);
            let _identity: string;
            for (_identity of _params) {
                const _meta = Reflect.getMetadata(TYPES[_identity],constructor)
                if (hasKey(this, _identity)&&_meta) {
                    this[_identity] = _meta;
                }
            }
        }
    }

    return Controller;
}

function inject(serviceIdentifier: Symbol): Function {

    return (target: Function, targetKey: string, index: number) => {
        if (!targetKey) {
            Reflect.defineMetadata(
                serviceIdentifier,
                container.get(serviceIdentifier),
                target
            )
        }
    }
}

@controller
class IndexController {
    private indexService: IIndexService;

    constructor(@inject (TYPES.indexService) indexService?: IIndexService) {
        this.indexService = indexService!;
        console.log('我是原来的构造函数');
    }

    info() {
        this.indexService.log('王君玮的测测试')
    }
}

export const base = new IndexController()
