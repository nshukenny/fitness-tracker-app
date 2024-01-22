import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({ type, message }) => {
  const showToast = () => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  return (
    <>
      {showToast()}
      <ToastContainer />
    </>
  );
};

export default ToastMessage;
