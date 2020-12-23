import {parseScript} from 'esprima';

interface IIndexService {
    log(str: string): void;
}

class IndexServie implements IIndexService {

    public log(str: string): void {
        console.log(str)
    }
}

function getParmas(fn: Function) {
    const ast = parseScript(fn.toString());
    console.log("ast===", ast);
}


// {} object 代码块 函数体。。
function controller<T extends { new(...args: any[]): {} }>(constructor: T) {
    class Controller extends constructor {
        constructor(...args: any[]) {
            getParmas(constructor)
            super(args)
        }
    }

    return Controller
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
