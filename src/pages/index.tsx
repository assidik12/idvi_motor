import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ProductServices from "@/services/products";
import ProductView from "@/components/views/products";
import ReviewServices from "@/services/review";

export default function Home({ setToaster }: any) {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const session: any = useSession();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await ProductServices.getAllProducts();
        setProducts(data.data);
      } catch (error) {
        throw error;
      }
    };

    const getReviews = async () => {
      try {
        const { data } = await ReviewServices.getAllReviews();
        setReviews(data.data);
      } catch (error) {
        throw error;
      }
    };

    getReviews();
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>Garasi-Kita - Jual Beli Kendaraan Terpercaya di Jatibarang, Brebes</title>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* --- META TAGS UTAMA UNTUK SEO --- */}
        <meta
          name="description"
          content="Garasi-Kita adalah dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Temukan berbagai merk kendaraan dengan harga kompetitif dan pelayanan terbaik. Hubungi kami untuk penawaran terbaik!"
        />
        <meta name="keywords" content="jual beli mobil, jual beli motor, dealer mobil brebes, dealer motor jatibarang, kendaraan bekas, mobil bekas brebes, motor bekas jatibarang, garasi kita" />
        <meta name="author" content="Garasi-Kita" />
        <link rel="canonical" href="https://www.garasi-kita.com" /> {/* Ganti dengan URL website Anda */}
        {/* --- META TAGS UNTUK LOKASI (GEO-TAGGING) --- */}
        <meta name="geo.placename" content="Jatibarang, Brebes, Indonesia" />
        <meta name="geo.region" content="ID-JT" /> {/* Kode ISO untuk Jawa Tengah */}
        {/* Ganti latitude dan longitude dengan koordinat dealer Anda yang sebenarnya */}
        <meta name="geo.position" content="-6.9634;109.0543" />
        <meta name="ICBM" content="-6.9634, 109.0543" />
        {/* --- META TAGS UNTUK MEDIA SOSIAL (OPEN GRAPH & TWITTER) --- */}
        {/* Open Graph (Facebook, Instagram, LinkedIn, dll.) */}
        <meta property="og:title" content="Garasi-Kita - Jual Beli Kendaraan di Jatibarang, Brebes" />
        <meta property="og:description" content="Dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Harga kompetitif dan pelayanan terbaik." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.garasi-kita.com" /> {/* Ganti dengan URL website Anda */}
        <meta property="og:image" content="https://www.garasi-kita.com/og-image.jpg" /> {/* Ganti dengan URL gambar preview website Anda (rekomendasi ukuran 1200x630px) */}
        <meta property="og:site_name" content="Garasi-Kita" />
        <meta property="og:locale" content="id_ID" />
        {/* Facebook Specific */}
        <meta property="fb:app_id" content="YOUR_FB_APP_ID" /> {/* Ganti dengan Facebook App ID Anda jika ada */}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@username_twitter_anda" /> {/* Ganti dengan username Twitter Anda */}
        <meta name="twitter:creator" content="@username_twitter_anda" />
        <meta name="twitter:title" content="Garasi-Kita - Jual Beli Kendaraan di Jatibarang, Brebes" />
        <meta name="twitter:description" content="Dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Harga terbaik dan terpercaya." />
        <meta name="twitter:image" content="https://www.garasi-kita.com/twitter-image.jpg" /> {/* Ganti dengan URL gambar untuk Twitter Card (rekomendasi ukuran 1200x630px) */}
        {/* --- SCHEMA MARKUP UNTUK LOCAL BUSINESS (PENTING UNTUK SEO LOKAL) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Garasi-Kita",
              image: "https://www.garasi-kita.com/logo.png", // URL logo dealer Anda
              "@id": "https://www.garasi-kita.com", // URL Website Anda
              url: "https://www.garasi-kita.com", // URL Website Anda
              telephone: "+62-XXX-XXXX-XXXX", // Ganti dengan nomor telepon dealer
              priceRange: "$$", // Estimasi rentang harga (misal: $, $$, $$$)
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Raya Jatibarang No. 123", // Ganti dengan alamat lengkap
                addressLocality: "Jatibarang",
                addressRegion: "Jawa Tengah",
                postalCode: "52261", // Ganti dengan kode pos
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.9634, // Ganti dengan latitude yang benar
                longitude: 109.0543, // Ganti dengan longitude yang benar
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "17:00",
              },
              sameAs: [
                "https://www.facebook.com/username_anda", // Ganti dengan URL Facebook
                "https://www.tiktok.com/@username_anda", // Ganti dengan URL TikTok
                "https://www.instagram.com/username_anda", // Ganti dengan URL Instagram
              ],
            }),
          }}
        />
      </Head>

      <main>{products.length > 0 && <ProductView reviews={reviews} products={products} session={session} signIn={signIn} signOut={signOut} setToaster={setToaster} />}</main>
    </>
  );
}
