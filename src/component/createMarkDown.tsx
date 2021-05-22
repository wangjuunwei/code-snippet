import React from 'react'

import ReactMarkdown from "react-markdown";

import gfm from 'remark-gfm'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'

const components = {
    code({node, inline, className, children, ...props}: any) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div"
                               children={String(children).replace(/\n$/, '')} {...props} />
        ) : (
            <code className={className} {...props} />
        )
    }
}

const MarkDownComponent: React.FC<{ innerHtml:string } > = ({innerHtml}) => {
    return (<> <ReactMarkdown components={components} remarkPlugins={[gfm]}
                              children={innerHtml}></ReactMarkdown></>)

}
export default MarkDownComponent

