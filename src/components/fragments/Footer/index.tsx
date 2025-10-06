const FooterView = () => {
  return (
    <footer className="bg-brand-blue text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Idvi Motor</h2>
            <p className="text-sm mb-4">Platform jual beli mobil bekas dan baru terpercaya di Brebes dan sekitarnya. Temukan kendaraan impian Anda dengan mudah.</p>
            <div className="flex space-x-4"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigasi</h3>
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
            <h3 className="text-lg font-semibold text-white mb-4">Bantuan</h3>
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
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>
            &copy; <span id="currentYear"></span> Idvi Motor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;
