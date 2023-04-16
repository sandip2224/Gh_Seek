import { toast } from 'react-toastify'

export const successToast = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_CENTER
  });
}

export const infoToast = (msg) => {
  toast.info(msg, {
    position: toast.POSITION.BOTTOM_CENTER
  });
}

export const errorToast = (msg) => {
  if (typeof msg === 'string') {
    toast.error(msg, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }
  else {
    toast.error('Something went wrong!', {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }
}