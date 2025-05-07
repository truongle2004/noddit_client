import { ToastOptions, toast } from 'react-toastify'

export const ToastifySuccess = (msg: string, options?: ToastOptions) => {
  toast.success(msg, options)
}

export const ToastifyWarning = (msg: string, options?: ToastOptions) => {
  toast.warning(msg, options)
}

export const ToastifyError = (msg: string, options?: ToastOptions) => {
  toast.error(msg, options)
}
