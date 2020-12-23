import {parseScript} from 'esprima';
import {Pattern} from 'estree'

interface IIndexService {
    log(str: string): void;
}

class IndexServie implements IIndexService {

    public log(str: string): void {
        console.log(str)
    }
}

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


// {} object 代码块 函数体。。
function controller<T extends { new(...args: any[]): {} }>(constructor: T) {
    class Controller extends constructor {
        constructor(...args: any[]) {
            super(args);
            const _params = getParmas(constructor);
            let _identity: string;
            for (_identity of _params) {
                this[_identity] = new IndexServie();
            }
        }
    }

    return Controller;
}

@controller
class IndexController {
    private indexServer: IIndexService;

    constructor(indexServer?: IIndexService) {
        this.indexServer = indexServer!
    }

    info() {
        this.indexServer.log('王君玮的测测试')
    }
}

export const base = new IndexController()
