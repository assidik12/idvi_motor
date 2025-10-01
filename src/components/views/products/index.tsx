import Button from "@/components/ui/button";
import formatCurrency from "@/utils/currency";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { TypeCar } from "@/types/product.type";
import TestimonialSection from "./Review";
import Maps from "./Maps";
import CarDetailPage from "./OrderModal";

// Skeleton Components
const CardSkeleton = () => (
  <div className="bg-gray-50 rounded-xl overflow-hidden card-shadow animate-pulse">
    <div className="w-full h-56 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-16 bg-gray-300 rounded mb-4"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const HeroSkeleton = () => (
  <section className="hero-gradient text-white py-20 md:py-32 animate-pulse">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="text-center md:text-left">
        <div className="h-12 bg-white/20 rounded mb-6 w-3/4"></div>
        <div className="h-6 bg-white/20 rounded mb-4"></div>
        <div className="h-6 bg-white/20 rounded mb-8 w-5/6"></div>
        <div className="h-12 bg-white/20 rounded w-48"></div>
      </div>
      <div className="relative">
        <div className="w-full h-96 bg-white/20 rounded-2xl"></div>
      </div>
    </div>
  </section>
);

const ProductView = (props: any) => {
  const { reviews, products, session, signIn, signOut, setToaster, isLoading = false } = props;
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
    const section = document.getElementById("mokas");
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
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

  // Render Skeleton saat loading
  if (isLoading) {
    return (
      <div>
        <HeroSkeleton />

        {/* rating section skeleton */}
        <section className="py-16 md:py-24 bg-brand-gray">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-xl card-shadow animate-pulse">
                  <div className="h-10 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-40 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* mokas section skeleton */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <div className="h-10 bg-gray-300 rounded w-48 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* rekomendasi section skeleton */}
        <section className="py-16 md:py-24 bg-brand-gray">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <div className="h-10 bg-gray-300 rounded w-64 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* dealer section */}
        <section className="py-16 md:py-24 bg-brand-blue">
          <div className="container mx-auto px-6">
            <div className="h-96 bg-white/20 rounded-xl animate-pulse"></div>
          </div>
        </section>

        {/* review section skeleton */}
        <section className="py-16 md:py-24 bg-brand-gray">
          <div className="container mx-auto px-6">
            <div className="h-10 bg-gray-300 rounded w-48 mx-auto mb-10 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl card-shadow animate-pulse">
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="bg-brand-blue text-gray-300 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded"></div>
                    <div className="h-4 bg-white/20 rounded w-5/6"></div>
                    <div className="h-4 bg-white/20 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <>
      {selectedCar ? (
        <CarDetailPage car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <div>
          {/* hero section */}
          <section className="hero-gradient text-white py-20 md:py-32">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Jual beli mobil <br className="hidden md:inline" />
                  di mana, dan <br className="hidden md:inline" />
                  kapan saja
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">Temukan mobil impian Anda dengan mudah dan aman bersama Supacars. Pilihan terlengkap, harga terbaik.</p>
                <a href="https://www.instagram.com/jualbeli_motormobil_brebes/" className="bg-brand-accent hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block">
                  Hubungi Kami
                </a>
              </div>
              <div className="relative">
                {products[0] && (
                  <>
                    <Image src={products[0].image} alt="[Gambar mobil modern berwarna putih]" width={600} height={400} className="rounded-2xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500" />
                    <div className="absolute -bottom-8 -right-8 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg hidden lg:block w-64">
                      <p className="text-sm font-semibold text-white">{products[0].name}</p>
                      <p className="text-xs text-gray-300">SUV Mewah, Performa Tinggi</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* rating section */}
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
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-gray">Mobil Terbaru</h2>
                <a href="/semua-mokas" className="text-brand-accent hover:underline font-semibold flex items-center">
                  Lihat Semua
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentItems.map((item: any) =>
                    item.condition === "New" ? (
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
                    ) : (
                      <></>
                    )
                  )}
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

          {/* rekomendasi */}
          <section id="rekomendasi" className="py-16 md:py-24 bg-brand-gray">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-gray">Rekomendasi Mobil Terbaik</h2>
                <Link href="/product/gallery" className="text-brand-accent hover:underline font-semibold flex items-center">
                  Lihat Semua
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentItems.map((item: any) =>
                    item.condition === "Used" ? (
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
                    ) : (
                      <></>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center gird xl-grid-cols-1 py-10">
                  <p className="text-xl text-brand-light-gray">Tidak ada mobil tersedia</p>
                </div>
              )}
            </div>
          </section>

          {/* dealer */}
          <section id="dealer" className="py-16 md:py-24 bg-brand-blue text-white">
            <Maps />
          </section>

          {/* review */}
          <section id="review" className="py-16 md:py-24 bg-brand-gray">
            {reviews.length > 0 ? (
              <TestimonialSection reviews={reviews} />
            ) : (
              <div className="text-center gird xl-grid-cols-1 py-10">
                <p className="text-xl text-brand-light-gray">Tidak ada testimoni tersedia</p>
              </div>
            )}
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
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
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
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 013.45 5.477a4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427.465C9.53 2.013 9.884 2 12.315 2zm0 1.623c-2.387 0-2.704.01-3.66.058a3.269 3.269 0 00-1.598.433 3.269 3.269 0 00-1.15.798 3.269 3.269 0 00-.799 1.15A3.269 3.269 0 004.01 8.69c-.047.956-.058 1.273-.058 3.66s.01 2.704.058 3.66a3.269 3.269 0 00.433 1.598 3.269 3.269 0 00.798 1.15 3.269 3.269 0 001.15.799A3.269 3.269 0 008.65 19.99c.956.047 1.273.058 3.66.058s2.704-.01 3.66-.058a3.269 3.269 0 001.598-.433 3.269 3.269 0 001.15-.798 3.269 3.269 0 00.799-1.15A3.269 3.269 0 0019.99 15.35c.047-.956.058-1.273.058-3.66s-.01-2.704-.058-3.66a3.269 3.269 0 00-.433-1.598 3.269 3.269 0 00-.798-1.15 3.269 3.269 0 00-1.15-.799A3.269 3.269 0 0015.97 4.01c-.956-.047-1.273-.058-3.66-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.647a3.512 3.512 0 110-7.024 3.512 3.512 0 010 7.024zM16.338 7.395a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                          clipRule="evenodd"
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
                  &copy; <span id="currentYear"></span> Supacars. All rights reserved.
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
