import Button from "@/components/ui/button";
import formatCurrency from "@/utils/currency";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { TypeCar } from "@/types/product.type";
import { CheckCircle, ChevronLeft, Phone, ShoppingCart, X } from "lucide-react";

const PreOrderModal: React.FC<{ isOpen: boolean; onClose: () => void; car: TypeCar }> = ({ isOpen, onClose, car }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengiriman form bisa ditambahkan di sini
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Alamat Email
                </label>
                <input type="email" id="email" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600" />
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

export const CarDetailPage: React.FC<{ car: TypeCar; onBack: () => void }> = ({ car, onBack }) => {
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
              <img src={activeImage || ""} alt={`Tampilan ${car.model}`} className="w-full h-auto object-cover aspect-video transition-all duration-300" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {/* {car.image.map((url, index) => (
                <button key={index} onClick={() => setActiveImage(url)} className={`rounded-lg overflow-hidden border-2 ${activeImage === url ? "border-blue-500" : "border-transparent"}`}>
                  <img src={url || ""} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover aspect-video" />
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

const ImageComponent = ({ src, alt, className }: any) => {
  return <Image src={src || "/placeholder-image.jpg"} alt={alt} className={className} width={400} height={224} objectFit="cover" />;
};

const ProductView = (props: any) => {
  const { products, session, signIn, signOut } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState<TypeCar | null>(null);
  const itemsPerPage = 4;
  const maxPageButtons = 5;

  // calculate item on this page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    // Opsional: scroll ke atas section ketika halaman berubah
    const section = document.getElementById("mokas");
    if (section) {
      // Memberikan sedikit penundaan agar DOM terupdate sebelum scrolling
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPageButtons / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageButtons / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageButtons;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 md:px-4 md:py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50
            ${currentPage === i ? "bg-brand-blue text-white shadow-md" : "bg-gray-200 text-brand-dark-gray hover:bg-gray-300"}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {selectedCar ? (
        <CarDetailPage car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <div>
          {/* // hero section */}
          <section className="hero-gradient text-white py-20 md:py-32">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Jual beli mobil <br className="hidden md:inline" />
                  di mana, dan <br className="hidden md:inline" />
                  kapan saja
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">Temukan mobil impian Anda dengan mudah dan aman bersama Supacars. Pilihan terlengkap, harga terbaik.</p>
                <a href="#search-bar" className="bg-brand-accent hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block">
                  Cari Mobil Sekarang{" "}
                </a>
              </div>
              <div className="relative">
                <Image src={products[0].image} alt="[Gambar mobil modern berwarna putih]" width={600} height={400} className="rounded-2xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500" />
                <div className="absolute -bottom-8 -right-8 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg hidden lg:block w-64">
                  <p className="text-sm font-semibold text-white">{products[0].name}</p>
                  <p className="text-xs text-gray-300">SUV Mewah, Performa Tinggi</p>
                </div>
              </div>
            </div>
          </section>

          {/* // search section */}
          <section id="search-bar" className="bg-white py-12 md:py-16 -mt-10 md:-mt-16 relative z-10 mx-4 md:mx-auto max-w-4xl rounded-xl shadow-2xl">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-semibold text-brand-dark-gray mb-6 text-center">Temukan Mobil Idamanmu</h2>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="search-keyword" className="block text-sm font-medium text-brand-light-gray mb-1">
                    Kata Kunci (cth: Toyota Avanza)
                  </label>
                  <input
                    type="text"
                    id="search-keyword"
                    name="search-keyword"
                    placeholder="Masukkan merek atau model mobil"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-accent focus:border-brand-accent transition duration-300"
                  />
                </div>
                <button type="submit" className="w-full bg-brand-accent hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-lg">
                  Cari
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-brand-light-gray">
                  Atau{" "}
                  <a href="#" className="text-brand-accent hover:underline">
                    lihat semua mobil
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* review section */}
          <section className="py-16 md:py-24 bg-brand-gray">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white p-8 rounded-xl card-shadow transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-4xl font-extrabold text-brand-accent mb-2">15K+</h3>
                  <p className="text-brand-dark-gray font-semibold text-lg">Mobil Terjual</p>
                  <p className="text-sm text-brand-light-gray mt-1">Dengan kualitas terjamin</p>
                </div>
                <div className="bg-white p-8 rounded-xl card-shadow transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-4xl font-extrabold text-brand-accent mb-2">20K+</h3>
                  <p className="text-brand-dark-gray font-semibold text-lg">Pelanggan Puas</p>
                  <p className="text-sm text-brand-light-gray mt-1">Bergabung dengan komunitas kami</p>
                </div>
                <div className="bg-white p-8 rounded-xl card-shadow transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-4xl font-extrabold text-brand-accent mb-2">150+</h3>
                  <p className="text-brand-dark-gray font-semibold text-lg">Brand Ternama</p>
                  <p className="text-sm text-brand-light-gray mt-1">Pilihan mobil dari berbagai merek</p>
                </div>
              </div>
            </div>
          </section>

          {/* mokas */}
          <section id="mokas" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-gray">Super Car Terpopuler</h2>
                {/* Arahkan ke halaman yang menampilkan semua mokas jika ada */}
                <a href="/semua-mokas" className="text-brand-accent hover:underline font-semibold flex items-center">
                  Lihat Semua
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentItems.map((item: any) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden card-shadow transform hover:-translate-y-2 transition-transform duration-300 group">
                      <div className="relative">
                        <Image width={500} height={500} className="w-full h-56 object-cover" src={item.image} alt={`${item.make} ${item.model}`} />
                        <span className={`absolute top-3 right-3 text-white text-xs font-bold py-1 px-3 rounded-full ${item.condition === "Baru" ? "bg-blue-500" : "bg-green-500"}`}>{item.condition}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-brand-dark-gray mb-2 truncate" title={item.make + item.model}>
                          {item.make + " " + item.model + " " + item.year}
                        </h3>
                        <p className="text-2xl font-bold text-brand-accent mb-1">{formatCurrency(item.price)}</p>

                        <h3 className="flex items-center mb-2 ">
                          <span className="text-md text-brand-light-gray">Mileage : </span>
                          <span className="ml-2">{item.mileage}</span>
                        </h3>
                        <p className="text-sm text-brand-light-gray mb-4 truncate">
                          {item.description?.substring(0, 100) +
                            (item.description?.length > 100
                              ? "..."
                              : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus ex repellat aliquid perferendis delectus totam est reprehenderit dolorem corporis, ea architecto debitis distinctio cum non blanditiis vero fugiat incidunt amet.")}
                        </p>
                        <Button
                          className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-semibold py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
                          onClick={() => {
                            setSelectedCar(item);
                          }}
                        >
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-xl text-brand-light-gray">Tidak ada mobil bekas yang tersedia saat ini.</p>
                </div>
              )}

              {/* Komponen Paginasi */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 md:px-4 md:py-2 rounded-md text-sm font-medium bg-gray-200 text-brand-dark-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
                      aria-label="Halaman Sebelumnya"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline ml-1">Sebelumnya</span>
                    </button>
                    {currentPage > Math.ceil(maxPageButtons / 2) && totalPages > maxPageButtons && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className="px-3 py-1 md:px-4 md:py-2 mx-1 rounded-md text-sm font-medium bg-gray-200 text-brand-dark-gray hover:bg-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
                        >
                          1
                        </button>
                        {currentPage > Math.ceil(maxPageButtons / 2) + 1 && <span className="px-2 py-1 md:px-3 md:py-2 text-brand-dark-gray">...</span>}
                      </>
                    )}
                    {renderPageNumbers()}
                    {currentPage < totalPages - Math.floor(maxPageButtons / 2) && totalPages > maxPageButtons && (
                      <>
                        {currentPage < totalPages - Math.floor(maxPageButtons / 2) - 1 && <span className="px-2 py-1 md:px-3 md:py-2 text-brand-dark-gray">...</span>}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-1 md:px-4 md:py-2 mx-1 rounded-md text-sm font-medium bg-gray-200 text-brand-dark-gray hover:bg-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 md:px-4 md:py-2 rounded-md text-sm font-medium bg-gray-200 text-brand-dark-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
                      aria-label="Halaman Berikutnya"
                    >
                      <span className="hidden sm:inline mr-1">Berikutnya</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-sm text-brand-light-gray">
                    Halaman {currentPage} dari {totalPages}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* dealer */}
          <section id="dealer" className="py-16 md:py-24 bg-brand-blue text-white">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dealer Resmi Dekat Anda</h2>
              <div className="map-placeholder h-80 max-md:h-[500px] w-full mb-48 max-md:mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3890961145694!2d109.0549386!3d-6.963343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fbc6532073a75%3A0x3c135d445f3545ff!2sBrother%20Cell!5e0!3m2!1sid!2sid!4v1690030509685!5m2!1sid!2sid"
                  width="100%"
                  height="500"
                  style={{ border: 0, borderRadius: "10px", overflow: "hidden" }}
                  loading="lazy"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lokasi Strategis</h3>
                  <p className="text-gray-300 text-sm">Mudah dijangkau dari berbagai area.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Layanan Cepat</h3>
                  <p className="text-gray-300 text-sm">Proses transaksi yang efisien.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Terpercaya</h3>
                  <p className="text-gray-300 text-sm">Dealer resmi dengan reputasi baik.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition duration-300">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Stok Lengkap</h3>
                  <p className="text-gray-300 text-sm">Berbagai pilihan mobil tersedia.</p>
                </div>
              </div>
            </div>
          </section>

          {/* rekomendasi */}
          <section id="rekomendasi" className="py-16 md:py-24 bg-brand-gray">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-gray">Rekomendasi Mobil Terbaik</h2>
                <Link href="/product/gallery" className="text-brand-accent hover:underline font-semibold flex items-center">
                  Lihat Semua
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </Link>
              </div>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl overflow-hidden card-shadow transform hover:-translate-y-2 transition-transform duration-300 group">
                    <Image src="" alt="[Gambar mobil baru 1]" className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-brand-dark-gray mb-2">Hyundai Creta Prime</h3>
                      <p className="text-2xl font-bold text-green-600 mb-1">Rp 400.000.000</p>
                      <p className="text-sm text-brand-light-gray mb-4">SUV Kompak, Fitur Canggih</p>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Pesan Sekarang</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl overflow-hidden card-shadow transform hover:-translate-y-2 transition-transform duration-300 group">
                    <Image src="" alt="[Gambar mobil baru 1]" className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-brand-dark-gray mb-2">Hyundai Creta Prime</h3>
                      <p className="text-2xl font-bold text-green-600 mb-1">Rp 400.000.000</p>
                      <p className="text-sm text-brand-light-gray mb-4">SUV Kompak, Fitur Canggih</p>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Pesan Sekarang</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* footer */}
          <footer className="bg-brand-blue text-gray-300 py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Supacars</h3>
                  <p className="text-sm mb-4">Platform jual beli mobil bekas dan baru terpercaya di Indonesia. Temukan kendaraan impian Anda dengan mudah.</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill-rule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 013.45 5.477a4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427.465C9.53 2.013 9.884 2 12.315 2zm0 1.623c-2.387 0-2.704.01-3.66.058a3.269 3.269 0 00-1.598.433 3.269 3.269 0 00-1.15.798 3.269 3.269 0 00-.799 1.15A3.269 3.269 0 004.01 8.69c-.047.956-.058 1.273-.058 3.66s.01 2.704.058 3.66a3.269 3.269 0 00.433 1.598 3.269 3.269 0 00.798 1.15 3.269 3.269 0 001.15.799A3.269 3.269 0 008.65 19.99c.956.047 1.273.058 3.66.058s2.704-.01 3.66-.058a3.269 3.269 0 001.598-.433 3.269 3.269 0 001.15-.798 3.269 3.269 0 00.799-1.15A3.269 3.269 0 0019.99 15.35c.047-.956.058-1.273.058-3.66s-.01-2.704-.058-3.66a3.269 3.269 0 00-.433-1.598 3.269 3.269 0 00-.798-1.15 3.269 3.269 0 00-1.15-.799A3.269 3.269 0 0015.97 4.01c-.956-.047-1.273-.058-3.66-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.647a3.512 3.512 0 110-7.024 3.512 3.512 0 010 7.024zM16.338 7.395a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Navigasi</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-white hover:underline text-sm">
                        Beranda
                      </a>
                    </li>
                    <li>
                      <a href="#mokas" className="hover:text-white hover:underline text-sm">
                        Mobil Bekas
                      </a>
                    </li>
                    <li>
                      <a href="#rekomendasi" className="hover:text-white hover:underline text-sm">
                        Mobil Baru
                      </a>
                    </li>
                    <li>
                      <a href="#dealer" className="hover:text-white hover:underline text-sm">
                        Cari Dealer
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white hover:underline text-sm">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a onClick={session.data ? () => signOut() : () => signIn()} className="hover:text-white hover:cursor-pointer hover:underline text-sm">
                        {session.data ? "Keluar" : "Masuk"}
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Bantuan</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-white hover:underline text-sm">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white hover:underline text-sm">
                        Hubungi Kami
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white hover:underline text-sm">
                        Kebijakan Privasi
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white hover:underline text-sm">
                        Syarat & Ketentuan
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
                  <p className="text-sm mb-3">Dapatkan info terbaru dan promo menarik dari Supacars.</p>
                  <form className="flex">
                    <input type="email" placeholder="Email Anda" className="w-full px-3 py-2 rounded-l-md text-sm text-brand-dark-gray focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                    <button type="submit" className="bg-brand-accent hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold text-sm">
                      Kirim
                    </button>
                  </form>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-8 text-center text-sm">
                <p>
                  &copy; <span id="currentYear"></span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default ProductView;
