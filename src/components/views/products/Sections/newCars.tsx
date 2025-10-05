import Link from "next/link";
import { CarCard, Pagination } from "..";
import { EmptyState } from "@/components/fragments/Empty";

function NewCarSection(props: any) {
  const { currentItems, handleSelectCar, handlePageChange, currentPage, totalPages } = props;

  return (
    <div className="container mx-auto px-6">
      <header className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mobil Terbaru</h2>
        <Link
          href="/product/gallery"
          className="text-blue-600 hover:text-blue-700 hover:underline font-semibold flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded transition-colors duration-200"
        >
          Lihat Semua
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </header>

      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentItems.map((item: any) => (
            <CarCard key={item.id} item={item} onSelectCar={handleSelectCar} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex">
            <div className="flex flex-col items-center justify-center w-full py-16 px-6">
              {/* Car Icon with Background */}
              <div className="mb-6 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-1.5-1.5M5 14l1.5-1.5M3 18h18M4 15h16l-2-6H6l-2 6zM8 18v2M16 18v2M9 10V8a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </div>

              {/* Content */}
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobil Tidak Ditemukan</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Saat ini tidak ada mobil baru yang tersedia. Silakan cek kembali nanti atau hubungi kami untuk informasi lebih lanjut.</p>

                {/* Action Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default NewCarSection;
