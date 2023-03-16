import { toast } from "react-hot-toast"

export const toastSuccess = (message: string) => {
    toast.success(message,{
        icon: "🚀"
    })
}

export const toastError = (message: string) => {
    toast.error(message)
}

export const toastInfo = (message: string) => {
    toast(message, {
        icon: "ℹ️",
    })
}