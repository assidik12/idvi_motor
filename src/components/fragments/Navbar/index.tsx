import Link from "next/link";
import { useSession } from "next-auth/react";

const NavbarView = () => {
  const session: any = useSession();
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const mobileMenu = document.getElementById("mobile-menu");
    const button = document.getElementById("mobile-menu-button");
    const isHidden = mobileMenu?.classList.contains("hidden");

    mobileMenu?.classList.toggle("hidden");
    button?.setAttribute("aria-expanded", isHidden ? "true" : "false");
  };
  return (
    <header className="bg-brand-blue sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center" role="navigation" aria-label="Main navigation">
        <Link href="/" className="text-2xl font-bold text-white" aria-label="Idvi Motor - Home">
          Idvi Motor
        </Link>
        <div className="hidden md:flex space-x-6 items-center" role="menubar">
          <Link href="/" className="text-gray-300 hover:text-white transition duration-300" role="menuitem">
            Beranda
          </Link>
          <Link href="/product/gallery" className="text-gray-300 hover:text-white transition duration-300" role="menuitem">
            Galeri
          </Link>
          <Link href="/#review" className="text-gray-300 hover:text-white transition duration-300" role="menuitem">
            Review
          </Link>
          <Link href={`/#dealer`} className="text-gray-300 hover:text-white transition duration-300" role="menuitem">
            Alamat
          </Link>
          {session.data?.accessToken ? (
            <Link href="/member/profile" className="text-gray-300 hover:text-white transition duration-300" role="menuitem">
              Profil
            </Link>
          ) : null}
        </div>
        <div className="md:hidden">
          <button
            id="mobile-menu-button"
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Toggle mobile menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" className="md:hidden bg-brand-blue-light w-1/2 absolute top-16 right-4 p-5 rounded-md items-center hidden" role="menu" aria-labelledby="mobile-menu-button">
        <Link href="/" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" role="menuitem">
          Beranda
        </Link>
        <Link href="/#mokas" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" role="menuitem">
          Mobil Bekas
        </Link>
        <Link href="/#dealer" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" role="menuitem">
          Dealer
        </Link>
        <Link href="/#rekomendasi" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" role="menuitem">
          Mobil Baru
        </Link>
        <Link href="/product/gallery" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" role="menuitem">
          Galeri
        </Link>
        {session.data?.accessToken && (
          <Link href="/member/profile" className="block text-gray-200 hover:text-white px-6 py-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" role="menuitem">
            Profil
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavbarView;
