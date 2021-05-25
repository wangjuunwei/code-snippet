type innerThemeContext = {
    foreground: string,
    background: string,

}

export type ThemeContextData = {
    dark: innerThemeContext
    light:innerThemeContext
    handleCl: () => void
}

