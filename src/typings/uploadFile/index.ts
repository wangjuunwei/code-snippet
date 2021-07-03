import React from "react";
import {UploadProgressEvent, RcFile, UploadRequestOption,} from "rc-upload/lib/interface";


export type fileType = Blob | string | RcFile

export type handlerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => void

export type blobToString = (blob: Blob) => Promise<string>

export type checkFileType = (file: Blob) => Promise<boolean>

export type handlerCreateFileChunk = (file: Blob | string | RcFile, size?: number) => { index: number; file: Blob | string | RcFile }[]

export type calulateHash = (chunks: { index: number, file: Blob | string | RcFile }[]) => Promise<string>

export type calculateHashSample = (file: { index: number; file: Blob | string | RcFile }[]) => Promise<string>

export type uploadChunks = (chunks: { name: string; index: number; chunk: fileType; error: number; hash: string }[], uploadChunks: string[], onProgress?: (event: UploadProgressEvent) => void) => Promise<unknown>

export type handleProgressChange = (options: { progress: any, index: number, onProgress?: (event: UploadProgressEvent) => void, error?: boolean }) => void

export type sendRequest = (chunks: any, onProgress?: (event: UploadProgressEvent) => void, limit?: number) => Promise<void>

export type mergeReqest = ({file, size, hash}: { file: any, size: number, hash: string | unknown }) => Promise<any>

export type validateFile = (hash: unknown, ext: string) => Promise<any>

export type uploadRequestOption = UploadRequestOption
