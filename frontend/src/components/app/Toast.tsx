import React, { useState, useEffect } from "react";

interface ToastProps {
  type: string;
  message: string;
}

// Toast component to display messages to the user
const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    if (type && message && type !== "" && message !== "") {
      setIsVisable(true);
    } else {
      setIsVisable(false);
    }
  }, [message]);

  return (
    <>
      <div
        className={`
          absolute top-10 right-0 py-3 ps-8 pe-14 duration-500 rounded-l-md text-white shadow-toast
          ${type == "error" ? "bg-red-600" : "bg-green-600"} 
          ${isVisable ? "opacity-100" : "opacity-0"}
        `}
      >
        <h4 className="text-xl font-semibold capitalize">{type}!</h4>
        <p>* {message}</p>
      </div>
    </>
  );
};

export default Toast;
