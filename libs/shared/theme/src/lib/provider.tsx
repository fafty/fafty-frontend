// @ts-ignore
import NextScript from 'next/script'
// @ts-ignore
import NextHead from 'next/head'
import React, { useCallback, useEffect, useState, memo } from 'react'
import Context from './context'
import { ThemeProviderProps, ProviderContextProps } from './types'
import {
  disableAnimation,
  encodeBase64,
  getSystemTheme,
  getTheme,
} from './utils'

const colorSchemes = ['light', 'dark']

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  disableTransitionOnChange = true,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = ['light', 'dark'],
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  children,
  nonce,
}) => {
  const [theme, setThemeState] = useState(() =>
    getTheme(storageKey, defaultTheme)
  )
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    getTheme(storageKey)
  )
  const attrs = !value ? themes : Object.values(value)

  const applyTheme = useCallback((theme: string) => {
    let resolved = theme
    // If theme is system, resolve it before setting theme
    if (theme === 'system' && enableSystem) {
      resolved = getSystemTheme()
    }
    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (attribute === 'class') {
      d.classList.remove(...attrs)
      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback
      // @ts-ignore
      d.style.colorScheme = colorScheme
    }

    enable?.()
  }, [])

  const setTheme = useCallback((theme: string) => {
    setThemeState(theme)
    try {
      localStorage.setItem(storageKey, theme)
    } catch (e) {
      // Unsupported
    }
  }, [])

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system' && enableSystem) {
        applyTheme('system')
      }
    },
    [theme] // [theme, forcedTheme]
  )

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery])

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }
      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme
      setTheme(theme)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme])

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    theme && applyTheme(theme)
  }, [theme])

  const contextValue: ProviderContextProps = {
    theme: theme,
    setTheme: setTheme,
    resolvedTheme: theme === 'system' ? resolvedTheme : theme,
    themes: enableSystem ? [...themes, 'system'] : themes,
    systemTheme: (enableSystem ? resolvedTheme : undefined) as
      | 'light'
      | 'dark'
      | undefined,
  }
  return (
    <Context.Provider value={contextValue}>
      <ThemeScript
        {...{
          disableTransitionOnChange,
          enableSystem,
          enableColorScheme,
          storageKey,
          themes,
          defaultTheme,
          attribute,
          value,
          children,
          attrs,
          nonce,
        }}
      />
      {children}
    </Context.Provider>
  )
}

const ThemeScript = memo(
  ({
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    attrs,
    nonce,
  }: ThemeProviderProps & { attrs: string[]; defaultTheme: string }) => {
    const defaultSystem = defaultTheme === 'system'

    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      if (attribute === 'class') {
        const removeClasses = `d.remove(${attrs
          .map((t: string) => `'${t}'`)
          .join(',')})`

        return `var d=document.documentElement.classList;${removeClasses};`
      } else {
        return `var d=document.documentElement;var n='${attribute}';var s = 'setAttribute';`
      }
    })()

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return ''
      }

      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`
      } else {
        return 'if(e===\'light\'||e===\'dark\')d.style.colorScheme=e'
      }
    })()

    const updateDOM = (
      name: string,
      literal = false,
      setColorScheme = true
    ) => {
      const resolvedName = value ? value[name] : name
      const val = literal ? name + '|| \'\'' : `'${resolvedName}'`
      let text = ''

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (
        enableColorScheme &&
        setColorScheme &&
        !literal &&
        colorSchemes.includes(name)
      ) {
        text += `d.style.colorScheme = '${name}';`
      }

      if (attribute === 'class') {
        if (literal || resolvedName) {
          text += `d.add(${val})`
        } else {
          text += 'null'
        }
      } else {
        if (resolvedName) {
          text += `d[s](n, ${val})`
        }
      }
      return text
    }

    const scriptSrc = (() => {
      if (enableSystem) {
        return `!function(){try {${optimization}var e=localStorage.getItem('${storageKey}');if("system"===e||(!e&&${defaultSystem})){var t="(prefers-color-scheme: dark)",m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          'dark'
        )}}else{${updateDOM('light')}}}else if(e){${
          value ? `var x=${JSON.stringify(value)};` : ''
        }${updateDOM(value ? 'x[e]' : 'e', true)}}${
          !defaultSystem
            ? 'else{' + updateDOM(defaultTheme, false, false) + '}'
            : ''
        }${fallbackColorScheme}}catch(e){}}()`
      }

      return `!function(){try{${optimization}var e=localStorage.getItem("${storageKey}");if(e){${
        value ? `var x=${JSON.stringify(value)};` : ''
      }${updateDOM(value ? 'x[e]' : 'e', true)}}else{${updateDOM(
        defaultTheme,
        false,
        false
      )};}${fallbackColorScheme}}catch(t){}}();`
    })()

    // We MUST use next/script's `beforeInteractive` strategy to avoid flashing on load.
    // However, it only accepts the `src` prop, not `dangerouslySetInnerHTML` or `children`
    // But our script cannot be external because it changes at runtime based on React props
    // so we trick next/script by passing `src` as a base64 JS script
    const encodedScript = `data:text/javascript;base64,${encodeBase64(
      scriptSrc
    )}`
    return (
      <NextScript
        id="next-themes-script"
        strategy="beforeInteractive"
        src={encodedScript}
        nonce={nonce}
      />
    )
  },
  // Never re-render this component
  () => true
)

export default ThemeProvider
