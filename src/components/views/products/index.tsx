import React, { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import formatCurrency from "@/utils/currency";
import { TypeCar } from "@/types/product.type";
import TestimonialSection from "./Sections/reviews";

import CarDetailPage from "./OrderModal";
import FooterView from "@/components/fragments/Footer";
import RatingView from "./Sections/rate";
import RecomendationView from "./Sections/recomendationCars";

import NewCarSection from "./Sections/newCars";
import { EmptyState } from "@/components/fragments/Empty";
import Maps from "./Sections/map";

// Types
interface ProductViewProps {
  reviews: any[];
  products: TypeCar[];
  session?: any;
  signIn?: () => void;
  signOut?: () => void;
  setToaster?: (message: string) => void;
  isLoading?: boolean;
  settings?: any[];
}

interface PaginationConfig {
  itemsPerPage: number;
  maxPageButtons: number;
}

// Constants
const PAGINATION_CONFIG: PaginationConfig = {
  itemsPerPage: 4,
  maxPageButtons: 5,
};

const DEFAULT_HERO_TITLE = "Jual beli mobil di mana, dan kapan saja";

// Skeleton Components

const HeroSkeleton: React.FC = () => (
  <section className="hero-gradient text-white py-20 md:py-32 animate-pulse" role="presentation">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="text-center md:text-left">
        <div className="h-12 bg-white/20 rounded mb-6 w-3/4" />
        <div className="h-6 bg-white/20 rounded mb-4" />
        <div className="h-6 bg-white/20 rounded mb-8 w-5/6" />
        <div className="h-12 bg-white/20 rounded w-48" />
      </div>
      <div className="relative">
        <div className="w-full h-96 bg-white/20 rounded-2xl" />
      </div>
    </div>
  </section>
);

// Car Card Component
export const CarCard: React.FC<{ item: TypeCar; onSelectCar: (car: TypeCar) => void }> = React.memo(({ item, onSelectCar }) => {
  const handleSelectCar = useCallback(() => {
    onSelectCar(item);
  }, [item, onSelectCar]);

  const truncatedDescription = useMemo(() => {
    if (item.description && item.description.length > 100) {
      return item.description.substring(0, 100) + "...";
    }
    return item.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit...";
  }, [item.description]);

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group border border-gray-200">
      <div className="relative">
        <Image width={500} height={500} className="w-full h-56 object-cover" src={item.image} alt={`${item.make} ${item.model} ${item.year}`} priority={false} loading="lazy" />
        <span className={`absolute top-3 right-3 text-white text-xs font-bold py-1 px-3 rounded-full ${item.condition === "Baru" ? "bg-blue-600" : "bg-green-600"}`}>{item.condition}</span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate" title={`${item.make} ${item.model} ${item.year}`}>
          {`${item.make} ${item.model} ${item.year}`}
        </h3>

        <p className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(item.price)}</p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{truncatedDescription}</p>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          onClick={handleSelectCar}
          aria-label={`Lihat detail ${item.make} ${item.model}`}
        >
          Lihat Detail
        </Button>
      </div>
    </article>
  );
});

CarCard.displayName = "CarCard";

// Pagination Component
export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = React.memo(({ currentPage, totalPages, onPageChange }) => {
  const { maxPageButtons } = PAGINATION_CONFIG;

  const pageNumbers = useMemo(() => {
    const pages = [];
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
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 md:px-4 md:py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            currentPage === i ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
          }`}
          aria-label={`Halaman ${i}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }
    return pages;
  }, [currentPage, totalPages, maxPageButtons, onPageChange]);

  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2" aria-label="Pagination Navigation">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 md:px-4 md:py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300"
          aria-label="Halaman Sebelumnya"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline ml-1">Sebelumnya</span>
        </button>

        {pageNumbers}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 md:px-4 md:py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300"
          aria-label="Halaman Berikutnya"
        >
          <span className="hidden sm:inline mr-1">Berikutnya</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="text-sm text-gray-700">
        Halaman {currentPage} dari {totalPages}
      </div>
    </nav>
  );
});

Pagination.displayName = "Pagination";

// Main Component
const ProductView: React.FC<ProductViewProps> = ({ reviews = [], products = [], session, signIn, signOut, setToaster, isLoading = false, settings = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState<TypeCar | null>(null);

  const { itemsPerPage } = PAGINATION_CONFIG;

  // Memoized calculations
  const { currentItems, totalPages, newCars } = useMemo(() => {
    const newCars = products.filter((item) => item.condition === "Baru");
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newCars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(newCars.length / itemsPerPage);

    return { currentItems, totalPages, newCars };
  }, [products, currentPage, itemsPerPage]);

  // Handlers
  const handlePageChange = useCallback(
    (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      setCurrentPage(pageNumber);

      const section = document.getElementById("mokas");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    },
    [totalPages]
  );

  const handleSelectCar = useCallback((car: TypeCar) => {
    setSelectedCar(car);
  }, []);

  const handleBackFromDetail = useCallback(() => {
    setSelectedCar(null);
  }, []);

  // Get hero title
  const heroTitle = useMemo(() => {
    return settings[0]?.heroTitle || DEFAULT_HERO_TITLE;
  }, [settings]);

  // Featured car
  const featuredCar = useMemo(() => {
    return products[0] || null;
  }, [products]);

  // Loading state
  if (isLoading) {
    return (
      <div role="status" aria-label="Loading content">
        <HeroSkeleton />
      </div>
    );
  }

  // Car detail view
  if (selectedCar) {
    return <CarDetailPage car={selectedCar} onBack={handleBackFromDetail} />;
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">{heroTitle}</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">Temukan mobil impian Anda dengan mudah dan aman bersama Supacars. Pilihan terlengkap, harga terbaik.</p>
            <Link
              href="https://www.instagram.com/jualbeli_motormobil_brebes/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi Kami
            </Link>
          </div>

          <div className="relative">
            {featuredCar && (
              <>
                <Image
                  src={featuredCar.image}
                  alt={`${featuredCar.make} ${featuredCar.model}`}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute -bottom-8 -right-8 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg hidden lg:block w-64">
                  <p className="text-sm font-semibold text-white">{featuredCar.name}</p>
                  <p className="text-xs text-gray-300">SUV Mewah, Performa Tinggi</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Rating Section */}
      <section className="py-16 md:py-24 bg-brand-gray">
        <RatingView />
      </section>

      {/* Cars Section */}
      <section id="new" className="py-16 md:py-24 bg-white">
        <NewCarSection currentItems={currentItems} handleSelectCar={handleSelectCar} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
      </section>

      {/* Recommendation Section */}
      <section id="rekomendasi" className="py-16 md:py-24 bg-brand-gray">
        <RecomendationView currentItems={currentItems} handleSelectCar={handleSelectCar} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
      </section>

      {/* Dealer Section */}
      <section id="dealer" className="py-16 md:py-24 bg-brand-blue text-white">
        <Maps />
      </section>

      {/* Review Section */}
      <section id="review" className="py-16 md:py-24 bg-brand-gray">
        {reviews.length > 0 ? <TestimonialSection reviews={reviews} /> : <EmptyState type="testimonials" />}
      </section>

      {/* Footer */}
      <FooterView />
    </main>
  );
};

export default ProductView;
