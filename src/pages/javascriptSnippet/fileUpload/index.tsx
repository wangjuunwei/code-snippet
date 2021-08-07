import React from 'react'
// import sparkMD5 from "spark-md5";
import {FileUploadRequest} from "@HttpRequest/fileUpload/index";
import {CubeWrapper} from "./css/index";
import {Spin, Upload, message} from "antd";
import {InboxOutlined} from '@ant-design/icons';

import CodeWrapper from "@component/createCodeWrapper.tsx";
import * as UploadType from "@typings/uploadFile";
import fileUpload from "./fileUpload.md";


const CHUNK_SIZE = 1 * 1024 * 1024

const CoreInfo = ({chunksList}: { chunksList: any }) => {

    console.log("chunksList===CoreInfo", chunksList);
    const mapData = () => {
        return chunksList && chunksList.map((item: { name: string, progress: number }, index: number) => {
            const itemProcess = item.progress
            console.log("itemProcess===", itemProcess);
            if (typeof itemProcess === 'number') {
                const typeClass = itemProcess < 0 ? 'error' : itemProcess === 100 ? 'success' : (itemProcess > 0 && itemProcess < 100) ? 'uploading' : 'error'
                return (<div className='cube' key={item.name}>
                    <div key={index} className={`${typeClass}`}
                         style={{height: itemProcess + '%'}}>
                        {(itemProcess > 0 && itemProcess < 100) && <Spin/>}
                    </div>
                </div>)
            }
            return false
        })

    }
    return (
        <CubeWrapper style={{width: (Math.ceil(Math.sqrt(chunksList.length)) * 16 * 2) + 'px', minHeight: '100px'}}>
            <h4>切片进度条</h4>
            {JSON.stringify(chunksList) !== '[]' ? mapData() : null}
        </CubeWrapper>
    )
}


const FileUpload: React.FC = () => {
    const {Dragger} = Upload;


    const [mapChunks, setChunks] = React.useState<{ [key: string]: any }[]>([])


    /**
     * @deprecated 文件切片
     * @param file 文件
     * @size 切片大小
     */
    const handlerCreateFileChunk: UploadType.handlerCreateFileChunk = (file, size = CHUNK_SIZE) => {

        const chunks = []
        let cur = 0
        while (cur < file['size']) {
            chunks.push({index: cur, file: file.slice(cur, cur + size)})
            cur += size
        }
        return chunks
    }


    /**
     * webWorker 事件文件编码
     * @param chunks
     */
    const calculateHashWorker: UploadType.calulateHash = async (chunks) => {
        return new Promise(resolve => {
            const worker = new Worker('hash.js')
            worker.postMessage({chunks})
            worker.onmessage = e => {
                const {progres, hash} = e.data
                console.log("progress===", progres);
                // setHashProcess(Number(progres.toFixed(2)))

                if (hash) {
                    resolve(hash)
                }

            }
        })
    }


    /**
     * fifber 事件碎片文件编码
     * @param chunks
     */
    // const calulateHashIdle: UploadType.calulateHash = async (chunks) => {
    //
    //     return new Promise(resolve => {
    //
    //         const spark = new sparkMD5.ArrayBuffer()
    //
    //         let count = 0
    //
    //         const appendToSprak = async (file: UploadType.fileType) => {
    //
    //             return new Promise(resolve => {
    //                 const reader = new FileReader()
    //                 reader.readAsArrayBuffer(file as Blob)
    //                 reader.onload = (e: any) => {
    //                     spark.append(e.target.result)
    //                     resolve()
    //                 }
    //             })
    //         }
    //
    //         const workLoop = async (deline: any) => {
    //
    //             while (count < chunks.length) {
    //
    //                 await appendToSprak(chunks[count].file)
    //                 count++
    //                 if (count < chunks.length) {
    //                     // setHashProcessldle(Number(((100 * count) / chunks.length).toFixed(2)))
    //                 } else {
    //                     // setHashProcessldle(100)
    //                     resolve(spark.end())
    //                 }
    //             }
    //             // @ts-ignore
    //             window.requestIdleCallback(workLoop)
    //         }
    //         // @ts-ignore
    //         window.requestIdleCallback(workLoop)
    //     })
    //
    // }


    /**
     * @deprecated 布隆过滤器简单抽样编码
     * @param file
     */
    // const calculateHashSample: UploadType.calculateHashSample = async (file) => {
    //
    //     return new Promise(resolve => {
    //
    //         const spark = new sparkMD5.ArrayBuffer()
    //
    //         const reader = new FileReader()
    //
    //         const size = file['size']
    //
    //         const offset = 2 * 1024 * 1024
    //
    //         let chunksitem: any[] = [file.slice(0, offset)]
    //
    //         let cur = offset
    //
    //         while (cur < size) {
    //
    //             if (cur + offset > size) {
    //
    //                 chunksitem.push(file.slice(cur, cur + offset))
    //             } else {
    //
    //                 const mid = cur + offset / 2
    //                 const end = cur + offset
    //
    //                 chunksitem.push(file.slice(cur, cur + 2))
    //                 chunksitem.push(file.slice(cur, mid + 2))
    //                 chunksitem.push(file.slice(cur, end + 2))
    //             }
    //             cur += offset
    //         }
    //
    //         reader.readAsArrayBuffer(new Blob(chunksitem))
    //         reader.onload = (e: any) => {
    //
    //             spark.append(e.target.result)
    //             // setHashProcesssample(100)
    //             resolve(spark.end())
    //         }
    //     })
    // }


    /**
     * @deprecated 文件验证请求
     * @param hash
     * @param ext
     */
    const validateFile: UploadType.validateFile = async (hash, ext) => {
        return new FileUploadRequest().validateFile({
            hash,
            ext
        })
    }


    /**
     * @deprecated 文件上传
     * @param chunks
     * @param uploadChunks
     */
    const uploadChunks: UploadType.uploadChunks = async (chunks, uploadChunks = [], onProgress) => {
        const request = chunks.filter(chunk => uploadChunks.indexOf(chunk.name) === -1)
            .map((chunk, index) => {

                const form = new FormData()
                form.append('hash', chunk.hash)
                form.append('name', chunk.name)
                form.append('chunk', chunk.chunk)


                // return {formData: form, index: chunk.index, error: chunk.error}
                return {formData: form, index: chunk.index, error: chunk.error, progress: chunk.chunk}
            })

        return await sendRequest(request, onProgress)
    }

    /**
     * @deprecated 进度条切换
     * @param progress
     * @param index
     * @param error
     */
    const handleProgressChange: UploadType.handleProgressChange = ({progress, index, onProgress, error = false}) => {
        setChunks(value => {

            const copyvalue = JSON.parse(JSON.stringify(value))

            if (error) {
                copyvalue[index].progress = -1
            } else {

                const filterllist = value.filter(item => item.progress > 0).reduce((pre, cur) => {

                    return pre + cur.progress
                }, 0)

                copyvalue[index].progress = Number(((progress.loaded / progress.total) * 100).toFixed(2))

                //@ts-ignore
                onProgress({percent: Number(((filterllist / (value.length * 100) * 100).toFixed(2)))})
            }

            return [...copyvalue]
        })

    }

    /**
     * @deprecated 异步并发控制
     * @param chunks
     * @param limit
     */
    const sendRequest: UploadType.sendRequest = async (chunks, onProgress, limit = 4) => {

        return new Promise((resolve, reject) => {

            const len = chunks.length
            let count = 0
            let isStop = false


            const start = async () => {
                console.log("chunks===start", chunks);
                if (isStop) {
                    return
                }
                const task = chunks.shift()
                if (len === 0) resolve()
                if (!task) return false
                const {formData, index} = task

                let res = await new FileUploadRequest().uploadFile(formData, {
                    onUploadProgress: (progress: any) => {
                        handleProgressChange({progress, index, onProgress})
                    }

                })

                if (res) {

                    if (count === len - 1) {
                        resolve()
                    } else {
                        count++
                        start()
                    }

                } else {
                    handleProgressChange({progress: {}, index, error: true})
                    if (task.error < 3) {
                        task.error++
                        chunks.unshift(task)
                        console.log("error", '=================');
                        start()
                    } else {
                        isStop = true
                        reject('失败了')
                    }
                }


            }


            while (limit > 0) {
                //启动limit 个任务
                start()
                limit -= 1

            }


        })

    }


    /**
     * @deprecated 合并文件请求
     * @param file
     * @param size
     * @param hash
     */
    const mergeReqest: UploadType.mergeReqest = async ({file, size, hash}) => {

        new FileUploadRequest().mergeFile({
            ext: file.name.split('.').pop(),
            size: CHUNK_SIZE,
            hash: hash
        })
    }
    /**
     * @deprecated 文件转16进制
     * @param blob
     */
    const blobToString: UploadType.blobToString = (blob) => {
        return new Promise(resolve => {
            const reader: FileReader = new FileReader()
            reader.onload = function () {
                const result: any = reader.result

                const ret = result.split('')
                    // 转为二进制的码
                    .map((v: { charCodeAt: () => any; }) => v.charCodeAt())
                    // 转为16进制
                    .map((v: { toString: (arg0: number) => string; }) => v.toString(16).toUpperCase())

                    .join(' ')
                resolve(ret)
            }
            reader.readAsBinaryString(blob)
        })
    }


    /**
     * @deprecated png 头文件判断
     * @param file
     */
    const isPng: UploadType.checkFileType = async (file) => {

        const ret = await blobToString(file.slice(0, 4))
        const ispng = (ret === "89 50 4E 47")

        return ispng
    }

    /**
     * @deprecated Jpg 头文件判断
     * @param file
     */
    const isJpg: UploadType.checkFileType = async (file) => {
        const len = file.size
        const start = await blobToString(file.slice(0, 2))
        const tail = await blobToString(file.slice(-2, len))
        const isjpg = (start === 'FF D8') && (tail === 'FF D9')
        return isjpg
    }

    /**
     * @deprecated GIf 头文件判断
     * @param file
     */
    const isGif: UploadType.checkFileType = async (file) => {

        const ret = await blobToString(file.slice(0, 6))

        const isGif = (ret === '47 49 46 38 39 61') || (ret === '47 49 46 38 37 61')

        return isGif

    }

    const props = {
        name: 'file',
        multiple: true,
        async beforeUpload(file: Blob): Promise<boolean | string> {

            const typeCheck = await isJpg(file) || await isGif(file) || await isPng(file)

            if (!typeCheck) message.error('文件上传失败')

            return typeCheck ? true : Upload.LIST_IGNORE

        },
        onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
            console.log("file===", info.file);
            const {status} = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} 上传成功.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败.`);
            }
        },
        onDrop(e: { dataTransfer: { files: any; }; }) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        async customRequest({file, onSuccess, onError, onProgress}: UploadType.uploadRequestOption): Promise<void> {

            const chunks = handlerCreateFileChunk(file)

            const hash: string = await calculateHashWorker(chunks)

            // const hash1: string = await calulateHashIdle(chunks)
            //
            // const hash2: string = await calculateHashSample(chunks)


            let res = await validateFile(hash, file['name'].split('.').pop())


            if (res.uploaded) {
                if (onSuccess) {
                    onSuccess(res, res)
                }
                return
            }


            const mapChunks: { name: string; index: number; chunk: UploadType.fileType; error: number; hash: string }[] = chunks.map((chunk, index) => {
                const name = hash + '-' + index
                return {
                    hash,
                    name,
                    index,
                    error: 0,
                    progress: res.uploadedList.indexOf(name) > -1 ? 100 : 0,
                    chunk: chunk.file
                }
            })
            console.log("mapChunks===", mapChunks);
            setChunks(mapChunks)
            try {
                await uploadChunks(mapChunks, res.uploadedList, onProgress)

                let req = await mergeReqest({file: file, size: CHUNK_SIZE, hash: hash})

                if (onSuccess) {
                    onSuccess(req, req)
                }
            } catch (e) {
                if (onError) {
                    onError(e)
                }
            }


        }
    };
    return (
        <>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">请点击上传按钮或将文件拖入</p>
            </Dragger>
            <CoreInfo chunksList={mapChunks}></CoreInfo>
        </>

    )
}
const FileUploadWrap: React.FC = () => {

    return (
        <>
            <CodeWrapper component={FileUpload} innerHtml={fileUpload}></CodeWrapper>

        </>
    )
}

export default React.memo(FileUploadWrap)


