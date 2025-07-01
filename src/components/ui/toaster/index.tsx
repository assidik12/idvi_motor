import { ToasterType } from "@/types/toaster.type";
import { useEffect, useRef, useState } from "react";

// Objek konfigurasi untuk setiap varian toaster
const ToasterVarian = {
  Success: {
    title: "Success",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
    classes: "bg-green-50 text-green-700",
    timerBarClass: "bg-green-500",
  },
  Error: {
    title: "Error",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
    classes: "bg-red-50 text-red-700",
    timerBarClass: "bg-red-500",
  },
  Warning: {
    title: "Warning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
      </svg>
    ),
    classes: "bg-yellow-50 text-yellow-700",
    timerBarClass: "bg-yellow-500",
  },
};

const Toaster = (props: ToasterType) => {
  const { varian = "Success", message, setToaster } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedVarian = ToasterVarian[varian];

  useEffect(() => {
    // Timer untuk progress bar
    timerRef.current = setInterval(() => {
      setLengthBar((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current!);
          setToaster({});
          return 0;
        }
        return prev - 0.33; // Disesuaikan agar selesai dalam ~3 detik
      });
    }, 10);

    // Membersihkan interval saat komponen di-unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [setToaster]);

  const handleClose = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setToaster({});
  };

  return (
    <div className={`fixed bottom-5 right-5 z-[99999] w-full max-w-sm rounded-lg shadow-lg overflow-hidden ${selectedVarian.classes}`}>
      <div className="relative p-4 flex items-start gap-4">
        {/* Tombol Close */}
        <button onClick={handleClose} className="absolute top-2 right-2 text-current opacity-70 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>

        {/* Ikon */}
        <div className="flex-shrink-0">{selectedVarian.icon}</div>

        {/* Teks */}
        <div className="flex-grow">
          <p className="font-bold">{selectedVarian.title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>

      {/* Progress Bar Timer */}
      <div className="w-full h-1 bg-current opacity-20">
        <div style={{ width: `${lengthBar}%` }} className={`h-full ${selectedVarian.timerBarClass}`} />
      </div>
    </div>
  );
};

export default Toaster;
