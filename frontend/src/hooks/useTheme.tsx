import { useEffect, useState } from "react";

export type themes = "light" | "dark" | "system";

const useTheme = () => {
    const [theme, setTheme] = useState<themes>("light")
    const [themeProviderElement, setThemeProviderElement] = useState<HTMLElement | null>()

    const getThemePrvovider = () => {
        const themeProvider = document.getElementById("themeProvider");
        if (themeProvider) return themeProvider;
        return document.querySelector("body");
    }

    useEffect(() => {
        const darkMode = getThemePrvovider();
        if (!darkMode)
            return;

        setThemeProviderElement(darkMode)
        const storage = window.localStorage.getItem("theme");
        if (!storage) {
            setTheme("system")
            return;
        }
        const containsDark = darkMode.classList.contains("dark");
        if (containsDark)
            setTheme("dark")
    }, [])

    const setThemeLocalStorage = (t: themes) => {
        window.localStorage.setItem("theme", JSON.stringify(t))
    }

    const removeThemeLocalStorage = () => {
        window.localStorage.removeItem("theme")
    }

    const toggleTheme = (theme: "dark" | "light" | "system") => {
        const themeProvider = getThemePrvovider();
        if (!themeProvider) return console.error("Cannot find body tag");
        switch (theme) {
            case "dark": {
                setThemeLocalStorage("dark");
                themeProvider.classList.add("dark")
                themeProvider.classList.remove("light")
                setTheme("dark")
                break;
            }
            case "light": {
                setThemeLocalStorage("light");
                themeProvider.classList.add("light")
                themeProvider.classList.remove("dark")
                setTheme("light")
                break;
            }
            case "system": {
                removeThemeLocalStorage();
                const darkMatchMd = window.matchMedia("(prefers-color-scheme: dark)");
                if (darkMatchMd.matches) {
                    setTheme("system");
                    themeProvider.classList.add("dark")
                    themeProvider.classList.remove("light")
                } else {
                    setTheme("system");
                    themeProvider.classList.add("light")
                    themeProvider.classList.remove("light")
                }
                break;
            }
        }
    }

    const detectThemeChange = () => {
        const darkMatchMd = window.matchMedia("(prefers-color-scheme: dark)");
        darkMatchMd.addEventListener("change", (e) => {
            const themeProvider = getThemePrvovider();
            if (!themeProvider) return;
            setTheme("system");
            if (e.matches) {
                themeProvider.classList.add("dark")
                themeProvider.classList.remove("light")
                return;
            }
            themeProvider.classList.remove("dark")
            themeProvider.classList.add("light")
        })
    }

    const isSystemDarkTheme: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const init = () => {
        detectThemeChange();
        const storage = window.localStorage.getItem("theme");
        const themeProvider = getThemePrvovider();
        if (!themeProvider) return;

        if (!storage) {
            const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (!isDarkTheme) return;
            if (!themeProvider) return;
            themeProvider.classList.add("dark")
            setTheme("system");
            return;
        };
        const t = JSON.parse(storage);
        themeProvider.classList.add(t)
        setTheme(t);
    }

    const themes = [
        "light",
        "dark",
        "system"
    ]

    return {
        theme,
        themeProviderElement,
        toggleTheme,
        init,
        isSystemDarkTheme,
        themes
    }
}

export default useTheme;