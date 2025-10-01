import Link from "next/link";
import { useSession } from "next-auth/react";

const NavbarView = () => {
  const session: any = useSession();
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu?.classList.toggle("hidden");
  };
  return (
    <header className="bg-brand-blue sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white">
          Garasi-Kita
        </a>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
            Beranda
          </Link>
          <Link href="/product/gallery" className="text-gray-300 hover:text-white transition duration-300">
            Galeri
          </Link>
          <Link href="/#review" className="text-gray-300 hover:text-white transition duration-300">
            Review
          </Link>
          <Link href={`/#dealer`} className="text-gray-300 hover:text-white transition duration-300">
            Alamat
          </Link>
          {session.data?.accessToken ? (
            <Link href="/member/profile" className="text-gray-300 hover:text-white transition duration-300">
              Profil
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="md:hidden">
          <button id="mobile-menu-button" onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" className="md:hidden bg-brand-blue-light w-1/2 absolute top-16 right-4 p-5 rounded-md items-center hidden">
        <a href="#" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300">
          Beranda
        </a>
        <a href="#mokas" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300">
          Mobil Bekas
        </a>
        <a href="#dealer" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300">
          Dealer
        </a>
        <a href="#rekomendasi" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300">
          Mobil Baru
        </a>
        <a href="#" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300">
          Tentang Kami
        </a>
      </div>
    </header>
  );
};

export default NavbarView;
