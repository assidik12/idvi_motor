import Link from "next/link";

export const EmptyState: React.FC<{ type: "cars" | "testimonials" }> = ({ type }) => {
  if (type === "cars") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        {/* Car Icon with Background */}
        <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-1.5-1.5M5 14l1.5-1.5M3 18h18M4 15h16l-2-6H6l-2 6zM8 18v2M16 18v2M9 10V8a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-bold text-brand-dark-gray mb-4">Mobil Tidak Ditemukan</h3>
          <p className="text-brand-light-gray leading-relaxed mb-6">Saat ini tidak ada mobil bekas yang tersedia. Silakan cek kembali nanti atau hubungi kami untuk informasi lebih lanjut.</p>

          {/* Action Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue hover:bg-brand-blue-light text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
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
    );
  }

  return (
    <div className="text-center py-10">
      <p className="text-xl text-brand-light-gray">Tidak ada testimoni tersedia</p>
    </div>
  );
};
