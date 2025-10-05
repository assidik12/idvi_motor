import { EmptyState } from "@/components/fragments/Empty";
import Button from "@/components/ui/button";
import formatCurrency from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

const RecomendationView = (props: any) => {
  const { currentItems, setSelectedCar } = props;

  // Filter hanya mobil dengan kondisi "Used"
  const usedCars = currentItems.filter((item: any) => item.condition === "Used");

  return (
    <div className="container mx-auto px-6">
      <header className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-gray">Rekomendasi Mobil Terbaik</h2>
        <Link href="/product/gallery" className="text-brand-accent hover:underline font-semibold flex items-center">
          Lihat Semua
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </header>

      {usedCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {usedCars.map((item: any) => (
            <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden card-shadow transform hover:-translate-y-2 transition-transform duration-300 group">
              <div className="relative">
                <Image width={500} height={500} className="w-full h-56 object-cover" src={item.image} alt={`${item.make} ${item.model}`} />
                <span className="absolute top-3 right-3 text-white text-xs font-bold py-1 px-3 rounded-full bg-green-500">{item.condition}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-brand-dark-gray mb-2 truncate" title={item.make + item.model}>
                  {item.make + " " + item.model + " " + item.year}
                </h3>
                <p className="text-2xl font-bold text-brand-accent mb-1">{formatCurrency(item.price)}</p>

                <div className="flex items-center mb-2 ">
                  <span className="text-md text-brand-light-gray">Mileage : </span>
                  <span className="ml-2">{item.mileage}</span>
                </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex">
            <div className="flex flex-col items-center justify-center w-full py-16 px-6">
              {/* Car Icon with Background */}
              <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-1.5-1.5M5 14l1.5-1.5M3 18h18M4 15h16l-2-6H6l-2 6zM8 18v2M16 18v2M9 10V8a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </div>

              {/* Content */}
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mobil Tidak Ditemukan</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Saat ini tidak ada mobil bekas yang tersedia. Silakan cek kembali nanti atau hubungi kami untuk informasi lebih lanjut.</p>

                {/* Action Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </div>
  );
};

export default RecomendationView;
