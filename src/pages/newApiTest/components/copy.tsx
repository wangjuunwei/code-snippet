import React from 'react'

interface CopyProps extends React.PropsWithChildren<{}> {
    text?: string,

}

interface InputRefProps {
    copy(): void,

    remo?(): void
}

type InputWarComp = React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement> & InputRefProps & React.ComponentPropsWithRef<any>>

const CopyInnerItem: React.ForwardRefRenderFunction<InputRefProps, CopyProps> = ({text}, copyInputRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(copyInputRef, () => ({
        copy() {
            const input = inputRef.current;
            if (input && input !== null) {
                console.log("text===", input.value);
                if (typeof text === "string") {
                    input.value = text;
                }
                input.select();
                console.log("input.select();===", input.select());
                document.execCommand('copy');
            }
        },
    }));
    return (<input type="text" ref={inputRef}/>)
}

const CopyInner = React.forwardRef<InputRefProps, CopyProps>(CopyInnerItem) as InputWarComp

const Copy: React.FC<CopyProps> = ({text, children}) => {
    const inputRef = React.useRef <InputRefProps>(null)

    const onCopy = () => {
        const input = inputRef.current;
        if (input && input !== null) {
            console.log("input.copy===", input.copy);
            input.copy()
        }
    }
    return (
        <span onClick={onCopy}>
            <CopyInner text={text} ref={inputRef}></CopyInner>
            {children}
        </span>
    )
}


export default React.memo(Copy)