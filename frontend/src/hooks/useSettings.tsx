import { useEffect, useState } from "react";

interface ISettings {
    sensitiveDataMode: boolean;
}

const defaultSettings: ISettings = {
    sensitiveDataMode: false
}

const useSettings = () => {
    const [settings, setSettings] = useState<ISettings>(defaultSettings)

    useEffect(() => {
        loadSettings();
    }, [])

    useEffect(() => {
        if (!settings)
            return;

        saveSettings();
    }, [settings])



    // store settings in local storage
    const saveSettings = () => {
        localStorage.setItem("settings", JSON.stringify(settings))
    }

    // load settings from local storage
    const loadSettings = () => {
        const storedSettings = localStorage.getItem("settings")
        if (storedSettings) {
            setSettings(JSON.parse(storedSettings))
        }
    }

    const toggleSensitiveDataMode = (val: boolean) => {
        setSettings({
            ...settings,
            sensitiveDataMode: val
        })
    }

    return {
        settings,
        toggleSensitiveDataMode
    }
}

export default useSettings;