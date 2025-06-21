import React, { useState, useEffect, useMemo, Fragment } from "react";
import { Search, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { TypeCar, carsData } from "@/types/product.type";
import formatCurrency from "@/utils/currency";
import { CarDetailPage } from "@/components/views/products";

// --- KOMPONEN KARTU MOBIL ---
const CarCard: React.FC<{ car: TypeCar; onSelect: () => void }> = ({ car, onSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={car.image[0]} alt={`${car.make} ${car.model}`} />
        <span className={`absolute top-3 right-3 text-white text-xs font-bold py-1 px-3 rounded-full ${car.condition === "Baru" ? "bg-blue-500" : "bg-green-500"}`}>{car.condition}</span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400">{car.make}</p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 truncate">{car.model}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {car.year} • {car.type}
        </p>
        <div className="mt-4 flex-grow">
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{formatCurrency(car.price)}</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onSelect}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN PAGINATION ---
const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12" aria-label="Pagination">
      <button onClick={handlePrev} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
        {" "}
        <ChevronLeft className="h-5 w-5" />{" "}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === number ? "bg-blue-600 text-white shadow-md" : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          {" "}
          {number}{" "}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
        {" "}
        <ChevronRight className="h-5 w-5" />{" "}
      </button>
    </nav>
  );
};

// --- KOMPONEN UTAMA (KONTROLER APLIKASI) ---
const CarGalleryApp = () => {
  const [selectedCar, setSelectedCar] = useState<TypeCar | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ make: "Semua Merek", condition: "Semua Kondisi" });
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  const uniqueMakes = useMemo(() => ["Semua Merek", ...new Set(carsData.map((car) => car.make))], []);
  const uniqueConditions = useMemo(() => ["Semua Kondisi", "Baru", "Bekas"], []);

  const filteredCars = useMemo(() => {
    return carsData
      .filter((car) => {
        const searchTermLower = searchTerm.toLowerCase();
        return car.make.toLowerCase().includes(searchTermLower) || car.model.toLowerCase().includes(searchTermLower);
      })
      .filter((car) => (filters.make === "Semua Merek" || car.make === filters.make) && (filters.condition === "Semua Kondisi" || car.condition === filters.condition));
  }, [searchTerm, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Tampilan akan berganti berdasarkan state selectedCar
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      {selectedCar ? (
        <CarDetailPage car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <Fragment>
          <main className="container mx-auto px-6 py-12">
            <section className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Temukan Mobil Impian Anda</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">Jelajahi koleksi mobil terbaik kami.</p>
            </section>

            <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
                <div className="lg:col-span-2">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Cari Mobil
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type="text"
                      id="search"
                      name="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Contoh: Toyota Supra..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Merek
                  </label>
                  <select
                    id="make"
                    name="make"
                    value={filters.make}
                    onChange={handleFilterChange}
                    className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {uniqueMakes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Kondisi
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={filters.condition}
                    onChange={handleFilterChange}
                    className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {uniqueConditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section>
              {currentCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentCars.map((car) => (
                    <CarCard key={car.id} car={car} onSelect={() => setSelectedCar(car)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <Car className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Mobil Tidak Ditemukan</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Coba ubah kata kunci pencarian atau sesuaikan filter Anda.</p>
                </div>
              )}
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
          </main>
        </Fragment>
      )}

      <footer className="bg-white dark:bg-gray-800 mt-16 border-t dark:border-gray-700">
        <div className="container mx-auto px-6 py-6 text-center text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} OtoGaleri. Didesain dengan penuh semangat.</div>
      </footer>
    </div>
  );
};

export default CarGalleryApp;
