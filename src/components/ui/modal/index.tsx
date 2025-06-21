import React, { Dispatch, useEffect, useRef } from "react";

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: Dispatch<any> }) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div id="userManagementModal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-25 backdrop-blur-md transition-opacity duration-300 ease-in-out w-full">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 ease-in-out scale-100 opacity-100" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
