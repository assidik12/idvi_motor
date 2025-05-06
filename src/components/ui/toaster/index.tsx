import { useEffect, useRef, useState } from "react";
import style from "./Toaster.module.scss";

type propsType = {
  varian?: "Succes" | "Error" | "Warning";
  message: string;
  setToaster: any;
};

const ToasterVarian: any = {
  Succes: {
    title: "Succes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#008000">
        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
    color: "#008000",
    barColor: "#3FFF3FFF",
  },
  Error: {
    title: "Error",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
    color: "#EA3323",
    barColor: "#FF5F5FFF",
  },
  Warning: {
    title: "Warning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E7EA57FF">
        <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
      </svg>
    ),
    color: "#E7EA57FF",
    barColor: "#FBFD70FF",
  },
};

const Toaster = (props: propsType) => {
  const { varian = "Succes", message, setToaster } = props;

  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLengthBar((prev) => prev - 0.3);
    }, 1);
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <div className={`${style.toaster} ${style[`toaster--${varian.toLowerCase()}`]}`}>
      <div className={style.toaster__main}>
        <i className={`${style.toaster__main__close}`} onClick={() => setToaster({})}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </i>
        <div className={`${style.toaster__main__icon} ${style[`toaster__main__icon--${varian.toLowerCase()}`]}`}>{ToasterVarian[varian].icon}</div>
        <div className={style.toaster__main__text}>
          <p className={style.toaster__main__text__title}>{varian}</p>
          <p className={style.toaster__main__text__message}>{message}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: ToasterVarian[varian].barColor,
        }}
        className={`${style.toaster__timer} ${style[`toaster__timer--${varian.toLowerCase()}`]}`}
      >
        <div style={{ width: `${lengthBar}%`, backgroundColor: ToasterVarian[varian].color, height: "100%" }} />
      </div>
    </div>
  );
};

export default Toaster;
