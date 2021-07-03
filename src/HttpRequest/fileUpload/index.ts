import {
    HttpPost,
    HttpRes,
    HttpPostData,
    HttpConfig,
    HttpHeader
} from "@utils/httpRequest/decorartorHttpTp/index"
import {getResponseData} from '@utils/httpRequest/decorartorHttpTp/utils/check'


export class FileUploadRequest {

    /**
     * @deprecated 文件上传
     * @param reqParams
     * @param config
     * @param res
     */
    @HttpPost('/file/uploadfile')
    @HttpHeader(['Content-Type:multipart/form-data'])
    public async uploadFile(@HttpPostData()reqParams: any, @HttpConfig() config: { [key: string]: any }, @HttpRes()res?: any) {

        return getResponseData(res)

    }

    /**
     * @deprecated 文件合并
     * @param reqPrams
     * @param res
     */
    @HttpPost('/file/mergefile')
    public async mergeFile(@HttpPostData()reqPrams: {}, @HttpRes()res?: any) {


        return getResponseData(res)
    }

    /**
     * @deprecated 文件合并
     * @param reqParms
     * @param res
     */
    @HttpPost('/file/validate')
    public async validateFile(@HttpPostData() reqParms: { ext: string; hash: unknown }, @HttpRes() res?: any) {

        return getResponseData(res)
    }
}

