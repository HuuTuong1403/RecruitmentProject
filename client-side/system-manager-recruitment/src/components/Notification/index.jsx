import { toast } from 'react-toastify'

export const notification = (content, type) => {
  if (type === 'success') {
    return toast.success(content)
  }
  if (type === 'error') {
    return toast.error(content)
  }
}
