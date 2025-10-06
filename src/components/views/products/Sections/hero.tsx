import Image from "next/image";
import Link from "next/link";

const HeroSection = (props: any) => {
  const { heroTitle, featuredCar } = props;
  console.log("Featured Car:", featuredCar);
  console.log("Hero Title:", heroTitle);

  return (
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">{heroTitle}</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">Temukan mobil impian Anda dengan mudah dan aman bersama Idvi Motor. Pilihan terlengkap, harga terbaik.</p>
        <Link
          href="https://www.instagram.com/jualbeli_motormobil_brebes/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi Kami
        </Link>
      </div>

      <div className="relative">
        {featuredCar && (
          <>
            <Image src={featuredCar.image} alt={`${featuredCar.make} ${featuredCar.model}`} width={600} height={400} className="rounded-2xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500" priority />
            <div className="absolute -bottom-8 -right-8 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg hidden lg:block w-64">
              <p className="text-sm font-semibold text-white">{featuredCar.name}</p>
              <p className="text-xs text-gray-300">SUV Mewah, Performa Tinggi</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
