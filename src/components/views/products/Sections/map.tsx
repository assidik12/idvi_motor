export default function Maps() {
  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dealer Resmi Dekat Anda</h2>
      <div className="h-80 max-md:h-[500px] w-full mb-48 max-md:mb-8">
        <iframe
          title="Dealer Location Map"
          name="Dealer Location Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1088.0806645864884!2d109.054564!3d-6.9611807!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fbc7ae64cf0bf%3A0x742e1ca3638ed0b5!2sIdvi%20Motor!5e1!3m2!1sid!2sid!4v1759673698061!5m2!1sid!2sid"
          width="100%"
          height="500"
          style={{ border: 0, borderRadius: "10px", overflow: "hidden" }}
          loading="lazy"
          allowFullScreen={true}
          referrerPolicy="no-referrer-when-downgrade"
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
  );
}
