/* eslint-disable @next/next/next-script-for-ga */
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
        <title>Idvi Motor - Jual Beli Kendaraan Terpercaya di Jatibarang, Brebes</title>
        <meta charSet="UTF-8" />

        {/* Updated Favicon - commonly used icon files */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="shortcut icon" href="/logo.png" type="image/png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Idvi Motor adalah dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Temukan berbagai merk kendaraan dengan harga kompetitif dan pelayanan terbaik. Hubungi kami untuk penawaran terbaik!"
        />
        <meta name="keywords" content="jual beli mobil, jual beli motor, dealer mobil brebes, dealer motor jatibarang, kendaraan bekas, mobil bekas brebes, motor bekas jatibarang, Idvi Motor" />
        <meta name="author" content="Idvi Motor" />
        <link rel="canonical" href="https://idvi-motor.vercel.app/" />
        <meta name="google-site-verification" content="MvB63igIQjEO8xCinb6FrMC5k6J41WAfVSaa_HsvEm4" />

        {/* META TAGS UNTUK LOKASI (GEO-TAGGING) */}
        <meta name="geo.placename" content="Jatibarang, Brebes, Indonesia" />
        <meta name="geo.region" content="ID-JT" />
        <meta name="geo.position" content="-6.9634;109.0543" />
        <meta name="ICBM" content="-6.9634, 109.0543" />

        {/* META TAGS UNTUK MEDIA SOSIAL (OPEN GRAPH) */}
        <meta property="og:title" content="Idvi Motor - Jual Beli Kendaraan di Jatibarang, Brebes" />
        <meta property="og:description" content="Dealer mobil dan motor bekas berkualitas di Jatibarang, Brebes. Harga kompetitif dan pelayanan terbaik." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://idvi-motor.vercel.app/" />

        {/* Updated OG Image - check your public folder for the actual logo file */}
        <meta property="og:image" content="https://idvi-motor.vercel.app/logo.png" />
        <meta property="og:site_name" content="Idvi Motor" />
        <meta property="og:locale" content="id_ID" />

        {/* SCHEMA MARKUP UNTUK LOCAL BUSINESS (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Idvi Motor",
              // Updated image URL - check your public folder for the actual file
              image: "https://idvi-motor.vercel.app/logo.png",
              "@id": "https://idvi-motor.vercel.app/",
              url: "https://idvi-motor.vercel.app/",
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
              sameAs: ["https://www.instagram.com/jualbeli_motormobil_brebes/"],
            }),
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TZ4JCPWB');
            `,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
      </Head>

      <main>
        <ProductView reviews={reviews} products={products} session={session} signIn={signIn} signOut={signOut} setToaster={setToaster} isLoading={isLoading} settings={settings} />
      </main>
    </>
  );
}
