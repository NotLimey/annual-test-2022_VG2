import { useEffect, useState } from "react";
import { DefaultToastOptions, Renderable, toast, Toast, ValueFunction, ValueOrFunction } from 'react-hot-toast';
import useTheme from "./useTheme";

interface PromiseToastProps {
    loading: Renderable;
    success: ValueOrFunction<Renderable, unknown>;
    error: ValueOrFunction<Renderable, any>;
}

const useToast = () => {
    const [style, setStyle] = useState<any>({})
    const { theme, isSystemDarkTheme } = useTheme();

    useEffect(() => {
        if (theme === "dark" || isSystemDarkTheme) {
            setStyle({
                backgroundColor: '#292524',
                color: "#f1f1f1",
                borderRadius: '5px',
            })
        }
    }, [theme, isSystemDarkTheme])

    const errorToast = (message: string, toastProps?: DefaultToastOptions) => {
        toast.error(message, {
            style: style,
            ...toastProps
        })
    }

    const successToast = (message: string, toastProps?: DefaultToastOptions) => {
        toast.success(message, {
            style: style,
            ...toastProps
        })
    }

    const emojiToast = (message: string, icon: string, toastProps?: DefaultToastOptions) => {
        toast.success(message, {
            style: style,
            icon: icon,
            ...toastProps
        })
    }

    const promiseToast = (func: Promise<unknown>, opts: PromiseToastProps, toastProps?: DefaultToastOptions) => {
        toast.promise(func, opts, {
            style: style,
            ...toastProps
        })
    }

    const jsxContentToast = (jsx: ValueFunction<Renderable, Toast>) => {
        toast(jsx)
    }

    return {
        errorToast,
        successToast,
        emojiToast,
        jsxContentToast,
        promiseToast
    }
}

export default useToast;