import {
    HttpGet,
    HttpPost,
    HttpRes,
    HttpPostData,
    HttpConfig,
    HttpHeader
} from "@utils/httpRequest/decorartorHttpTp/index"
import {getResponseData} from '@utils/httpRequest/decorartorHttpTp/utils/check'
import {RegisterData} from "@typings/jwt/index";


export class UserHttpRequest {

    /**
     * @summary 获取图片验证码
     * @param res
     */
    @HttpGet('/user/captcha')
    public async getCaptcha(@HttpRes() res?: any) {
        console.log("res===", res);
        return getResponseData(res)
    }

    /**
     * @deprecated 注册
     * @param reqParams
     * @param res
     */
    @HttpPost('/user/register')
    public async register(@HttpPostData()reqParams: RegisterData, @HttpRes() res?: any) {

        return getResponseData(res)
    }

    /**
     * @deprecated 登陆
     * @param reqParams
     * @param res
     */
    @HttpPost('/user/login')
    public async login(@HttpPostData()reqParams: RegisterData, @HttpRes() res?: any) {

        return getResponseData(res)
    }

    /**
     * @deprecated 获取用户信息
     * @param res
     */
    @HttpPost('/user/info')
    public async info(@HttpRes() res?: any) {

        return getResponseData(res)
    }


    @HttpPost('user/test', {},)
    public async test(@HttpPostData()reqParams: any, @HttpConfig() config: { [key: string]: any }, @HttpRes()res?: any,) {

        console.log("res===", res);
        return getResponseData(res)
    }

    @HttpPost('/user/uploadfile')
    @HttpHeader(['Content-Type:multipart/form-data'])
    public async uploadFile(@HttpPostData()reqParams: any, @HttpConfig() config: { [key: string]: any }, @HttpRes()res?: any) {

        return getResponseData(res)

    }

    @HttpPost('/user/mergefile')
    public async mergeFile(@HttpPostData()reqPrams: {}, @HttpRes()res?: any) {


        return getResponseData(res)
    }

    @HttpPost('/user/validate')
    public async validateFile(@HttpPostData() reqParms: { ext: string; hash: unknown }, @HttpRes() res?: any) {

        return getResponseData(res)
    }
}

