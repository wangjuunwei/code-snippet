import {ThemeContextData} from "./types";
import React from "react";

const themes: ThemeContextData = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",

    },
    handleCl: () => {
        console.log('我是contex对象上的函数dark')
    }
};

export const ThemeContext = React.createContext<ThemeContextData>(themes)

/**
 * @description Context 包裹组件
 * @param children
 * @constructor
 */
const ContextWrapper: React.FC = ({children}) => {

    return (
        <ThemeContext.Provider value={themes}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ContextWrapper
