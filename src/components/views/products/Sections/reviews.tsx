import React, { useState, useMemo } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Data dummy untuk testimoni, ini bisa diganti dengan data dari API
const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    testimonial: "Pelayanan di Supacars luar biasa! Prosesnya cepat, transparan, dan saya mendapatkan mobil impian saya dengan harga terbaik. Sangat direkomendasikan!",
  },
];

// Komponen untuk menampilkan bintang rating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center justify-center">
      {[...Array(5)].map((_, index) => (
        <Star key={index} size={20} className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
      ))}
    </div>
  );
};

// Komponen Kartu Testimoni Individual
const TestimonialCard = ({ name, location, avatar, rating, testimonial }: (typeof testimonials)[0]) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full text-center transform hover:-translate-y-2 transition-transform duration-300">
      <Image
        src={avatar}
        alt={`Foto ${name}`}
        width={80}
        height={80}
        className="rounded-full object-cover w-20 h-20 mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://placehold.co/80x80/E2E8F0/4A5568?text=User";
        }}
      />
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-base italic leading-relaxed mb-4 flex-grow">&ldquo;{testimonial}&rdquo;</p>
      <div>
        <p className="font-bold text-lg text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
      </div>
    </div>
  );
};

// Komponen Utama Section Testimoni dengan Slider
const TestimonialSection = (props: any) => {
  const { reviews } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Mengelompokkan testimoni ke dalam halaman-halaman
  const testimonialPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < reviews.length; i += itemsPerPage) {
      pages.push(reviews.slice(i, i + itemsPerPage));
    }
    return pages;
  }, [reviews]);

  const totalPages = testimonialPages.length;

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Apa Kata Pelanggan Kami?</h2>
        <p className="mt-4 text-lg text-gray-600max-w-2xl mx-auto">Kami bangga telah melayani ribuan pelanggan. Lihat apa yang mereka katakan tentang pengalaman mereka bersama kami.</p>
      </div>

      <div className="relative">
        {/* Slider Container */}
        <div className="overflow-hidden relative">
          <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {reviews.map((review: any) => (
              <div key={review.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform hover:-translate-y-2 transition-transform duration-300">
                  <TestimonialCard key={review.id} {...review} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Navigasi Kiri */}
        <button
          onClick={prevPage}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition z-10"
          aria-label="Previous Testimonials"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>

        {/* Tombol Navigasi Kanan */}
        <button onClick={nextPage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition z-10" aria-label="Next Testimonials">
          <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>

        {/* Indikator Titik (Pagination) */}
        <div className="flex justify-center space-x-2 mt-12">
          {testimonialPages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToPage(pageIndex)}
              className={`w-3 h-3 rounded-full transition-colors ${currentPage === pageIndex ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"}`}
              aria-label={`Go to page ${pageIndex + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
