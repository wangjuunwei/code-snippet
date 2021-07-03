## 文件上传


### 1、功能简介
结合antd的upload组件完成的切片上传组件(已完成文件md5、切片上传、文件合并、断点续传功能)


### 2、文件Md5加密
```javascript
1、文件切片

const handlerCreateFileChunk: UploadType.handlerCreateFileChunk = (file, size = CHUNK_SIZE) => {
    const chunks = []
    let cur = 0
    while (cur < file['size']) {
        chunks.push({index: cur, file: file.slice(cur, cur + size)})
        cur += size
    }
    return chunks
}

2、文件切片增量MD5(spark-md5)
    
- 2.1 使用web-worker 进行
- 2.2 使用时间碎片文件编码(借鉴react fiber 原理)
- 2.3 使用的算法简单抽样编码
```


### 3、文件上传校验(秒传以及续传)
```javascript

主要功能通过node检验当前文件夹或者远端存储服务是否有当前文件。

node 实现版本
const filePath = path.resolve('public/uploads', `${hash}.${ext}`);
fse.existsSync(filePath)
```

### 4、文件合并
```javascript
完成的上传后的切片的合并，进行流的读写操作。

// 读取所有切片
const chunkDir = path.resolve('public/uploads', filehash);
const chunks = await fse.readdir(chunkDir);

// 创建写入流
fse.createWriteStream(dest, {
    start: index * size,
    end: (index + 1) * size,
})

// 创建读取流
const readStream = fse.createReadStream(filePath);
readStream.on('end', () => {
    fse.unlinkSync(filePath);
    resolve();
});
readStream.pipe(writeStream);
```

### 5、请求并发控制
```javascript
 const sendRequest: UploadType.sendRequest = async (chunks, onProgress, limit = 4) => {

        return new Promise((resolve, reject) => {

            const len = chunks.length
            let count = 0
            let isStop = false
            
            const start = async () => {
                if (请求成功) {

                    if (count === len - 1) {
                        resolve()
                    } else {
                        count++
                        start()
                    }

                } else {
                    if (task.error < 3) {
                        task.error++
                        chunks.unshift(task)
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
```
