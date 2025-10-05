import { useState } from "react";
import Image from "next/image";
import AdminLayout from "@/components/layouts/AdminLayout";

interface LandingPageSettings {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroImage: string;
  heroCardTitle: string;
  heroCardSubtitle: string;

  // Stats Section
  stat1Value: string;
  stat1Label: string;
  stat1Description: string;
  stat2Value: string;
  stat2Label: string;
  stat2Description: string;
  stat3Value: string;
  stat3Label: string;
  stat3Description: string;

  // Sections
  newCarsTitle: string;
  recommendedCarsTitle: string;

  // Footer
  companyName: string;
  companyDescription: string;
  footerNewsletter: string;

  // Contact
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;

  // Styling
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

const LandingPageSettingsPage = ({ setToaster }: any) => {
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "sections" | "footer" | "styling">("hero");
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<LandingPageSettings>({
    // Hero Section
    heroTitle: "Jual beli mobil\ndi mana, dan\nkapan saja",
    heroSubtitle: "Temukan mobil impian Anda dengan mudah dan aman bersama Supacars. Pilihan terlengkap, harga terbaik.",
    heroButtonText: "Hubungi Kami",
    heroButtonLink: "https://www.instagram.com/jualbeli_motormobil_brebes/",
    heroImage: "/images/hero-car.jpg",
    heroCardTitle: "Toyota Supra",
    heroCardSubtitle: "SUV Mewah, Performa Tinggi",

    // Stats Section
    stat1Value: "15K+",
    stat1Label: "Mobil Terjual",
    stat1Description: "Dengan kualitas terjamin",
    stat2Value: "20K+",
    stat2Label: "Pelanggan Puas",
    stat2Description: "Bergabung dengan komunitas kami",
    stat3Value: "150+",
    stat3Label: "Brand Ternama",
    stat3Description: "Pilihan mobil dari berbagai merek",

    // Sections
    newCarsTitle: "Mobil Terbaru",
    recommendedCarsTitle: "Rekomendasi Mobil Terbaik",

    // Footer
    companyName: "Supacars",
    companyDescription: "Platform jual beli mobil bekas dan baru terpercaya di Indonesia. Temukan kendaraan impian Anda dengan mudah.",
    footerNewsletter: "Dapatkan info terbaru dan promo menarik dari Supacars.",

    // Contact
    facebookUrl: "https://facebook.com/supacars",
    instagramUrl: "https://instagram.com/supacars",
    twitterUrl: "https://twitter.com/supacars",

    // Styling
    primaryColor: "#2563eb",
    secondaryColor: "#3b82f6",
    fontFamily: "Inter, sans-serif",
  });

  const handleInputChange = (field: keyof LandingPageSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      setToaster({
        variant: "success",
        message: "Pengaturan berhasil disimpan!",
      });
    } catch (error) {
      setToaster({
        variant: "error",
        message: "Gagal menyimpan pengaturan",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (field: keyof LandingPageSettings) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleInputChange(field, e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const tabs = [
    { id: "hero", label: "Hero Section", icon: "🎯" },
    { id: "stats", label: "Statistics", icon: "📊" },
    { id: "sections", label: "Sections", icon: "📑" },
    { id: "footer", label: "Footer", icon: "📄" },
    { id: "styling", label: "Styling", icon: "🎨" },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Landing Page Settings</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Kelola tampilan dan konten landing page Anda</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button onClick={() => setIsPreview(!isPreview)} className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="hidden sm:inline">{isPreview ? "✏️ Edit" : "👁️ Preview"}</span>
                  <span className="sm:hidden">{isPreview ? "✏️" : "👁️"}</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="hidden sm:inline">Menyimpan...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">💾 Simpan Perubahan</span>
                      <span className="sm:hidden">💾 Simpan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 lg:flex-shrink-0">
              {/* Mobile Tabs - Dropdown */}
              <div className="lg:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.icon} {tab.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      <span className="mr-3 text-lg">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                {/* Hero Section Tab */}
                {activeTab === "hero" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Hero Section Settings</h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Atur konten utama di bagian hero landing page</p>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Judul Hero *</label>
                      <textarea
                        value={settings.heroTitle}
                        onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan judul hero..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Gunakan \n untuk line break</p>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Subtitle Hero *</label>
                      <textarea
                        value={settings.heroSubtitle}
                        onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
                        rows={2}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan subtitle..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Teks Button</label>
                        <input
                          type="text"
                          value={settings.heroButtonText}
                          onChange={(e) => handleInputChange("heroButtonText", e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Hubungi Kami"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Link Button</label>
                        <input
                          type="url"
                          value={settings.heroButtonLink}
                          onChange={(e) => handleInputChange("heroButtonLink", e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="flex-shrink-0 w-full sm:w-auto">{settings.heroImage && <img src={settings.heroImage} alt="Hero" className="w-full sm:w-32 h-24 object-cover rounded-lg border border-gray-300" />}</div>
                        <button onClick={() => handleImageUpload("heroImage")} className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                          📤 Upload Gambar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Card Title</label>
                        <input
                          type="text"
                          value={settings.heroCardTitle}
                          onChange={(e) => handleInputChange("heroCardTitle", e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Toyota Supra"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Card Subtitle</label>
                        <input
                          type="text"
                          value={settings.heroCardSubtitle}
                          onChange={(e) => handleInputChange("heroCardSubtitle", e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="SUV Mewah, Performa Tinggi"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Section Tab */}
                {activeTab === "stats" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Statistics Settings</h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Atur angka statistik yang ditampilkan</p>
                    </div>

                    {[1, 2, 3].map((num) => (
                      <div key={num} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">Statistik {num}</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Nilai</label>
                            <input
                              type="text"
                              value={settings[`stat${num}Value` as keyof LandingPageSettings]}
                              onChange={(e) => handleInputChange(`stat${num}Value` as keyof LandingPageSettings, e.target.value)}
                              className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="15K+"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Label</label>
                            <input
                              type="text"
                              value={settings[`stat${num}Label` as keyof LandingPageSettings]}
                              onChange={(e) => handleInputChange(`stat${num}Label` as keyof LandingPageSettings, e.target.value)}
                              className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Mobil Terjual"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                            <input
                              type="text"
                              value={settings[`stat${num}Description` as keyof LandingPageSettings]}
                              onChange={(e) => handleInputChange(`stat${num}Description` as keyof LandingPageSettings, e.target.value)}
                              className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Dengan kualitas terjamin"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sections Tab */}
                {activeTab === "sections" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Section Titles</h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Atur judul untuk berbagai section</p>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Judul Section Mobil Baru</label>
                      <input
                        type="text"
                        value={settings.newCarsTitle}
                        onChange={(e) => handleInputChange("newCarsTitle", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mobil Terbaru"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Judul Section Rekomendasi</label>
                      <input
                        type="text"
                        value={settings.recommendedCarsTitle}
                        onChange={(e) => handleInputChange("recommendedCarsTitle", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Rekomendasi Mobil Terbaik"
                      />
                    </div>
                  </div>
                )}

                {/* Footer Tab */}
                {activeTab === "footer" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Footer Settings</h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Atur informasi footer dan social media</p>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Nama Perusahaan</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Supacars"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Deskripsi Perusahaan</label>
                      <textarea
                        value={settings.companyDescription}
                        onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Deskripsi perusahaan..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Teks Newsletter</label>
                      <input
                        type="text"
                        value={settings.footerNewsletter}
                        onChange={(e) => handleInputChange("footerNewsletter", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Dapatkan info terbaru..."
                      />
                    </div>

                    <div className="border-t pt-4 sm:pt-6">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">Social Media Links</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                          <input
                            type="url"
                            value={settings.facebookUrl}
                            onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                          <input
                            type="url"
                            value={settings.instagramUrl}
                            onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                          <input
                            type="url"
                            value={settings.twitterUrl}
                            onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://twitter.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Styling Tab */}
                {activeTab === "styling" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Styling & Branding</h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Sesuaikan warna dan font website</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                        <div className="flex items-center space-x-3">
                          <input type="color" value={settings.primaryColor} onChange={(e) => handleInputChange("primaryColor", e.target.value)} className="h-10 w-16 sm:w-20 rounded border border-gray-300 cursor-pointer" />
                          <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                            className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="#2563eb"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                        <div className="flex items-center space-x-3">
                          <input type="color" value={settings.secondaryColor} onChange={(e) => handleInputChange("secondaryColor", e.target.value)} className="h-10 w-16 sm:w-20 rounded border border-gray-300 cursor-pointer" />
                          <input
                            type="text"
                            value={settings.secondaryColor}
                            onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                            className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="#3b82f6"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Font Family</label>
                      <select
                        value={settings.fontFamily}
                        onChange={(e) => handleInputChange("fontFamily", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Inter, sans-serif">Inter</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="Poppins, sans-serif">Poppins</option>
                        <option value="Montserrat, sans-serif">Montserrat</option>
                        <option value="Open Sans, sans-serif">Open Sans</option>
                        <option value="Lato, sans-serif">Lato</option>
                      </select>
                    </div>

                    <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-xs sm:text-sm font-medium text-blue-800">Tips Styling</h3>
                          <div className="mt-2 text-xs sm:text-sm text-blue-700 space-y-1">
                            <p>• Pilih warna yang konsisten dengan brand Anda</p>
                            <p>• Pastikan kontras warna cukup untuk readability</p>
                            <p>• Font yang mudah dibaca akan meningkatkan user experience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LandingPageSettingsPage;
