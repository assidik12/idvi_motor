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
    }
  }, [isOpen]);

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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 m-4 max-w-lg w-full transform transition-all duration-300 scale-95 hover:scale-100" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X className="h-6 w-6" />
        </button>
        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Formulir Pre-Order</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Anda akan melakukan pre-order untuk{" "}
              <span className="font-semibold">
                {car.make} {car.model}
              </span>
              .
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Nama Lengkap
                </label>
                <input type="text" id="name" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Alamat Rumah
                </label>
                <input type="text" id="address" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Nomor Telepon
                </label>
                <input type="tel" id="phone" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                Kirim Pre-Order
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Terima Kasih!</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Permintaan pre-order Anda telah kami terima. Tim kami akan segera menghubungi Anda.</p>
            <button onClick={onClose} className="mt-6 w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
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
