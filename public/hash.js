self.importScripts('spark-md5.min.js')

self.onmessage = function (e) {

    var chunks = e.data.chunks

    var spark = new self.SparkMD5.ArrayBuffer()

    var progres = 0;

    var count = 0


    const loadNext = function (index) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunks[index].file)
        reader.onload = function (e) {

            spark.append(e.target.result)

            count++
            if (count == chunks.length) {
                self.postMessage({
                    progres: 100,
                    hash: spark.end()
                })

                return false
            } else {
                progres += 100 / chunks.length

                console.log("progres===", progres);
                self.postMessage({
                    progres: progres
                })
            }

            loadNext(count)

        }
    }
    loadNext(0)
}
