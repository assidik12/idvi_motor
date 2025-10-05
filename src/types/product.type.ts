export interface TypeCar {
  id?: string;
  name: string;
  make: string; // Merek
  model: string; // Model
  year: number; // Tahun
  price: number; // Harga
  condition: "Baru" | "Bekas"; // Kondisi
  type: "SUV" | "Sedan" | "Sport" | "Hatchback" | "Listrik"; // Jenis
  image: string; // URL gambar (sekarang menjadi array)
  description: string; // Deskripsi singkat
  specs: { [key: string]: string }; // Spesifikasi detail
  status?: "Active" | "Inactive";
  created_at?: Date;
  mileage?: number; // Added mileage property
  updated_at?: Date;
}

// --- DATA CONTOH (MOCK DATA) ---
export const carsData: TypeCar[] = [
  {
    id: "1",
    name: "contoh",
    make: "Toyota",
    model: "Supra GR",
    year: 2023,
    price: 2100000000,
    condition: "Baru",
    type: "Sport",
    image: "https://placehold.co/800x600/000000/FFFFFF?text=Supra+Depan",
    description: "Mobil sport legendaris yang kembali dengan performa luar biasa dan desain yang memukau. Ditenagai mesin 3.0L Turbo 6-silinder.",
    specs: { Mesin: "3.0L Turbo Inline-6", Transmisi: "8-Speed Automatic", Tenaga: "382 hp", Warna: "Merah Menyala" },
  },
  {
    id: "2",
    name: "contoh",
    make: "Honda",
    model: "HR-V",
    year: 2022,
    price: 450000000,
    condition: "Bekas",
    type: "SUV",
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=HR-V+Depan",
    description: "SUV kompak yang stylish dan efisien, cocok untuk perkotaan. Irit bahan bakar dan memiliki kabin yang luas.",
    specs: { Mesin: "1.5L 4-Cylinder", Transmisi: "CVT", Kilometer: "15,000 km", Warna: "Putih Mutiara" },
  },
  {
    id: "3",
    name: "contoh",
    make: "Tesla",
    model: "Model S",
    year: 2024,
    price: 1800000000,
    condition: "Baru",
    type: "Listrik",
    image: "https://placehold.co/800x600/333333/FFFFFF?text=Tesla+Model+S",
    description: "Sedan listrik mewah dengan akselerasi instan dan jangkauan impresif. Dilengkapi dengan teknologi Autopilot canggih.",
    specs: { Baterai: "100 kWh", Jangkauan: "600 km", "0-100 km/j": "2.1 detik", Warna: "Hitam Solid" },
  },
  {
    id: "4",
    name: "contoh",
    make: "BMW",
    model: "M4 Competition",
    year: 2023,
    price: 2500000000,
    condition: "Baru",
    type: "Sport",
    image: "https://placehold.co/800x600/000000/FFFFFF?text=BMW+M4+Depan",
    description: "Kombinasi sempurna antara kemewahan, teknologi, dan kecepatan brutal. Sebuah ikon performa dari BMW.",
    specs: { Mesin: "3.0L Twin-Turbo Inline-6", Transmisi: "8-Speed M Steptronic", Tenaga: "503 hp", Warna: "Biru Portimao" },
  },
  {
    id: "5",
    name: "contoh",
    make: "Mitsubishi",
    model: "Pajero Sport",
    year: 2021,
    price: 550000000,
    condition: "Bekas",
    type: "SUV",
    image: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Pajero+Sport+Depan",
    description: "SUV tangguh untuk segala medan petualangan. Andal, kuat, dan nyaman untuk keluarga.",
    specs: { Mesin: "2.4L MIVEC Turbo Diesel", Transmisi: "8-Speed Automatic", Kilometer: "30,000 km", Warna: "Abu-abu" },
  },
  {
    id: "6",
    name: "contoh",
    make: "Hyundai",
    model: "Ioniq 5",
    year: 2023,
    price: 800000000,
    condition: "Baru",
    type: "Listrik",
    image: "https://placehold.co/800x600/333333/FFFFFF?text=Hyundai+Ioniq+5+Depan",
    description: "Crossover listrik dengan desain retro-futuristik yang unik dan platform E-GMP yang canggih.",
    specs: { Baterai: "72.6 kWh", Jangkauan: "481 km", Fitur: "Vehicle-to-Load (V2L)", Warna: "Cyber Gray" },
  },
];

export interface ProductViewProps {
  reviews: any[];
  products: TypeCar[];
  session?: any;
  signIn?: () => void;
  signOut?: () => void;
  setToaster?: (message: string) => void;
  isLoading?: boolean;
  settings?: any[];
}
