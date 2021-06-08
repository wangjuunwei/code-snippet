import React from "react";
import Rpromise from './Promise'


const PromisePR: React.FC = () => {


    new Rpromise((reslove: any, reject: any) => {

        reslove('success')
    }).then(
        (res: any) => {
            console.log('Rpromise', res)
        },
        (err: any) => {
            console.log(err)
        }
    )

    new Promise((reslove: any, reject: any) => {

        reslove('success1111')
    }).then(
        (res: any) => {
            console.log('123123123213', res)
        },
    )

    //
    // React.useEffect(() => {
    //
    //
    //
    // }, [])

    // new Rpromise<void>((resolve) => {
    //     resolve()
    // })
    //     .then(() => {
    //         return 'step1'
    //     })
    //     .then((res) => {
    //         return res + ':' + 'step2'
    //     })
    //     .then((res) => {
    //         console.log(res) // step1:step2
    //     })


    // new Rpromise((reslove, reject) => {
    //     setTimeout(() => {
    //         reslove('timeout success')
    //     }, 2000)
    // }).then(
    //     (res) => {
    //         console.log(res) // timeout success
    //     },
    //     (err) => {
    //         console.log(err)
    //     }
    // )


    return (
        <>我就是过的promise的重写</>
    )
}

export default PromisePR
