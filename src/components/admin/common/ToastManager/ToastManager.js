import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ToastManager Component
const ToastManager = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

// showToast Function
const showToast = (message, type) => {
  toast.dismiss(); // Dismiss any existing toasts

  if (type === "success") {
    toast.success(message, { position: "top-right" });
  } else if (type === "error") {
    toast.error(message, { position: "top-right" });
  }
};

// Exporting both ToastManager and showToast
export { ToastManager, showToast };
