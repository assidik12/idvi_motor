import { TypeCar } from "@/types/product.type";
import formatCurrency from "@/utils/currency";
import messageToOwner from "@/utils/sending";
import { CheckCircle, ChevronLeft, Phone, ShoppingCart, Star, X } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
const PreOrderModal: React.FC<{ isOpen: boolean; onClose: () => void; car: TypeCar }> = ({ isOpen, onClose, car }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Handle Escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    // Cleanup function to restore scroll and remove event listener
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengiriman form bisa ditambahkan di sini
    const form: any = e.target as HTMLFormElement;
    const message = `Halo, saya ingin melakukan pre-order untuk mobil ${car.make} ${car.model}.
      \nNama saya adalah ${form.name.value}.
      \nAlamat saya adalah ${form.address.value}.
      \nTerima kasih.`;

    await messageToOwner(message);

    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300 ease-out"
      onClick={onClose}
      style={{ backdropFilter: "blur(8px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 m-4 max-w-lg w-full transform transition-all duration-300 scale-95 hover:scale-100 relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px)",
        }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100/50" aria-label="Close modal">
          <X className="h-6 w-6" />
        </button>
        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-2">
                Formulir Pre-Order
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4"></div>
              <p id="modal-description" className="text-gray-600 leading-relaxed">
                Anda akan melakukan pre-order untuk{" "}
                <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {car.make} {car.model}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div className="group">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Alamat Rumah
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Masukkan alamat lengkap Anda"
                />
              </div>

              <div className="group">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Kirim Pre-Order
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="h-12 w-12 text-white animate-bounce" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-400/30 rounded-full mx-auto animate-ping"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">Terima Kasih!</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full mx-auto mb-4"></div>

            <p className="text-gray-600 leading-relaxed mb-6 px-4">
              Permintaan pre-order Anda untuk{" "}
              <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                {car.make} {car.model}
              </span>{" "}
              telah kami terima. Tim kami akan segera menghubungi Anda.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CarDetailPage: React.FC<{ car: TypeCar; onBack: () => void }> = ({ car, onBack }) => {
  const [activeImage, setActiveImage] = useState(car.image);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <main className="container mx-auto px-6 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-6">
          <ChevronLeft className="h-5 w-5" />
          Kembali ke Galeri
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Galeri Gambar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-4">
              <Image width={500} height={500} src={activeImage || ""} alt={`Tampilan ${car.model}`} className="w-full h-auto object-cover aspect-video transition-all duration-300" quality={100} priority />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {/* {car.image.map((url, index) => (
                  <button key={index} onClick={() => setActiveImage(url)} className={`rounded-lg overflow-hidden border-2 ${activeImage === url ? "border-blue-500" : "border-transparent"}`}>
                    <Image width={10} height={10} src={url || ""} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover aspect-video" />
                  </button>
                ))} */}
            </div>
          </div>

          {/* Detail Informasi & Aksi */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <span className={`inline-block text-white text-xs font-bold py-1 px-3 rounded-full mb-2 ${car.condition === "Baru" ? "bg-blue-500" : "bg-green-500"}`}>{car.condition}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">{car.make}</p>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{car.model}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {car.year} • {car.type}
              </p>

              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4">{formatCurrency(car.price)}</p>

              <p className="text-gray-700 dark:text-gray-200 mt-4">{car.description}</p>

              <div className="mt-6 border-t pt-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Spesifikasi Utama</h3>
                <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                  {car.specs &&
                    Object.entries(car.specs).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="font-medium text-gray-500 dark:text-gray-400">{key}</span>
                        <span>{value}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Pre-Order Sekarang
                </button>
                <button className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  <Phone className="h-5 w-5" />
                  Hubungi Customer Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PreOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} car={car} />
    </Fragment>
  );
};

export default CarDetailPage;
