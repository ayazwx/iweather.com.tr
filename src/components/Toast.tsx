import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const position = 'top-right';

export const notify = (text: string) =>
  toast(text, {
    duration: 4000,
    position: position,

    style: {},
    className: '',

    // Custom Icon
    icon: '👏',

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },

    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

export const notifyError = (text: string) =>
    toast.error(text, {
        duration: 4000,
        position: position,
    });

export const notifySuccess = (text: string) =>
    toast.success(text, {
        duration: 4000,
        position: position,
    });

export const notifyLoading = (text: string) =>
    toast.loading(text, {
        duration: 4000,
        position: position,
    });

export const notifyPromise = async (promise: Promise<any>, successMessage: string, errorMessage: string) => {
    notifyLoading('Loading...');
    try {
        await promise;
        notifySuccess(successMessage);
    } catch (error) {
        notifyError(errorMessage);
    }
}

export const ToastComponent = () => {
  return <Toaster />;
};
