const RatingView = () => {
  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Statistik Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl font-extrabold text-blue-600 mb-2" aria-label="15 ribu lebih">
            15K+
          </div>
          <p className="text-gray-900 font-semibold text-lg">Mobil Terjual</p>
          <p className="text-sm text-gray-700 mt-1">Dengan kualitas terjamin</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl font-extrabold text-blue-600 mb-2" aria-label="20 ribu lebih">
            20K+
          </div>
          <p className="text-gray-900 font-semibold text-lg">Pelanggan Puas</p>
          <p className="text-sm text-gray-700 mt-1">Bergabung dengan komunitas kami</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl font-extrabold text-blue-600 mb-2" aria-label="150 lebih">
            150+
          </div>
          <p className="text-gray-900 font-semibold text-lg">Brand Ternama</p>
          <p className="text-sm text-gray-700 mt-1">Pilihan mobil dari berbagai merek</p>
        </div>
      </div>
    </div>
  );
};

export default RatingView;
