import React, { Dispatch, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

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
    <div className={styles.modal}>
      <div className={styles.modal__content} ref={ref}>
        {/* <button onClick={() => onClose(false)}>X</button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
