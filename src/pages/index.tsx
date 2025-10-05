import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ProductServices from "@/services/products";
import ProductView from "@/components/views/products";
import ReviewServices from "@/services/review";

export default function Home({ setToaster }: any) {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const session: any = useSession();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await ProductServices.getAllProducts();
        setProducts(data.data);
      } catch (error) {
        setProducts([]);
      }
    };

    const getSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        const result = await response.json();
        if (result.status) {
          setSettings(result.data);
        }
      } catch (error) {
        setSettings({});
      }
    };

    const getReviews = async () => {
      try {
        const { data } = await ReviewServices.getAllReviews();
        setReviews(data.data);
      } catch (error) {
        setReviews([]);
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([getData(), getReviews(), getSettings()]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  return (
    <>
      <Head>
        <title>Garasi Kita - Jual Beli Kendaraan Terpercaya di Jatibarang, Brebes</title>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Garasi-Kita adalah dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Temukan berbagai merk kendaraan dengan harga kompetitif dan pelayanan terbaik. Hubungi kami untuk penawaran terbaik!"
        />
        <meta name="keywords" content="jual beli mobil, jual beli motor, dealer mobil brebes, dealer motor jatibarang, kendaraan bekas, mobil bekas brebes, motor bekas jatibarang, garasi kita" />
        <meta name="author" content="Garasi-Kita" />
        {/* URL kanonikal diperbarui ke domain Vercel Anda */}
        <link rel="canonical" href="https://garasi-kita-assidik.vercel.app/" />

        {/* --- META TAGS UNTUK LOKASI (GEO-TAGGING) - Paling optimal menggunakan koordinat --- */}
        <meta name="geo.placename" content="Jatibarang, Brebes, Indonesia" />
        <meta name="geo.region" content="ID-JT" />
        {/* Koordinat ini sudah akurat untuk menargetkan lokasi Jatibarang */}
        <meta name="geo.position" content="-6.9634;109.0543" />
        <meta name="ICBM" content="-6.9634, 109.0543" />

        {/* --- META TAGS UNTUK MEDIA SOSIAL (OPEN GRAPH) --- */}
        <meta property="og:title" content="Garasi-Kita - Jual Beli Kendaraan di Jatibarang, Brebes" />
        <meta property="og:description" content="Dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Harga kompetitif dan pelayanan terbaik." />
        <meta property="og:type" content="website" />
        {/* URL Open Graph diperbarui */}
        <meta property="og:url" content="https://garasi-kita-assidik.vercel.app/" />
        {/* Pastikan gambar ini tersedia di URL berikut */}
        <meta property="og:image" content="https://garasi-kita-assidik.vercel.app/logo.jpg" />
        <meta property="og:site_name" content="Garasi-Kita" />
        <meta property="og:locale" content="id_ID" />

        {/* --- SCHEMA MARKUP UNTUK LOCAL BUSINESS (JSON-LD) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Garasi-Kita",
              // Pastikan logo ini tersedia di URL berikut
              image: "https://garasi-kita-assidik.vercel.app/logo.jpg",
              // URL @id dan url utama diperbarui
              "@id": "https://garasi-kita-assidik.vercel.app/",
              url: "https://garasi-kita-assidik.vercel.app/",
              // CATATAN: Jangan lupa ganti nomor telepon ini dengan yang asli
              telephone: "+62 851-5486-7042",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Sindukerten No.35",
                addressLocality: "Jatibarang",
                addressRegion: "Jawa Tengah",
                postalCode: "52261",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.9634,
                longitude: 109.0543,
              },

              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "17:00",
              },
              // Tautan media sosial diperbarui hanya dengan Instagram
              sameAs: ["https://www.instagram.com/jualbeli_motormobil_brebes/"],
            }),
          }}
        />
      </Head>

      <main>
        <ProductView reviews={reviews} products={products} session={session} signIn={signIn} signOut={signOut} setToaster={setToaster} isLoading={isLoading} settings={settings} />
      </main>
    </>
  );
}
