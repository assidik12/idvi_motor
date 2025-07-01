import MemeberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import UserServices from "@/services/user";
import { User } from "@/types/user.type";

type propsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
  profile: User;
  setProfile: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ProfileMemberview = ({ profile, setProfile, session, setToaster }: propsType) => {
  const [loading, setLoading] = useState("");

  // Handler to update user's password
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("password");

    const form = e.target as HTMLFormElement;
    const data = {
      oldPassword: form.oldPassword.value,
      password: form.newPassword.value,
      encryptedPassword: profile.password,
    };

    try {
      const res = await UserServices.updateProfile(session.data?.accessToken, data);
      if (res.status) {
        setLoading("");
        form.reset();
        setToaster({
          message: "Password berhasil diperbarui",
          varian: "Success",
        });
      }
    } catch (error) {
      setLoading("");
      form.reset();
      setToaster({ message: "Gagal memperbarui password", varian: "Error" });
    }
  };

  // Handler to update user's profile information (fullname, email)
  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email?.value,
    };
    const result = await UserServices.updateProfile(session.data?.accessToken, data);
    if (result.status) {
      setLoading("");
      const { data } = await UserServices.getProfile(session.data?.accessToken);
      setProfile(data.data);
      setToaster({
        message: "Profil berhasil diperbarui",
        varian: "Success",
      });
    } else {
      setLoading("");
      setToaster({ message: "Gagal memperbarui profil", varian: "Error" });
    }
  };

  // Handler to change user's profile picture
  const handleChangeProfilePicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("image");

    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];

    if (!file) return;

    if (file.size > 1178600) {
      return setToaster({
        message: "Ukuran gambar harus kurang dari 1MB",
        varian: "Warning",
      });
    }

    await uploadFile(profile.id, "profile", file, async (newImageUrl: string) => {
      setProfile({ ...profile, image: newImageUrl });
      const data = { image: newImageUrl };
      const result = await UserServices.updateProfile(session.data?.accessToken, data);
      if (result.status) {
        setToaster({
          message: "Gambar profil berhasil diperbarui",
          type: "Success",
        });
      } else {
        setToaster({
          message: "Gagal memperbarui gambar profil",
          type: "Error",
        });
      }
      form.reset();
      setLoading("");
    });
  };

  return (
    <MemeberLayout>
      <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Foto Profil */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4 self-start">Foto Profil</h2>
              <form onSubmit={handleChangeProfilePicture} className="w-full flex flex-col items-center gap-4">
                {profile.image ? (
                  <Image src={profile.image} priority alt="Foto Profil" width={180} height={180} className="w-44 h-44 object-cover rounded-full border-4 border-gray-200" />
                ) : (
                  <div className="w-44 h-44 bg-gray-200 rounded-full flex items-center justify-center text-6xl font-bold text-gray-500 border-4 border-gray-200">{profile?.fullname ? profile.fullname.charAt(0).toUpperCase() : "A"}</div>
                )}
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                  name="image"
                  id="image"
                />
                <Button type="submit" className="w-full py-2.5 px-4 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200" disabled={loading === "image"}>
                  {loading === "image" ? "Mengunggah..." : "Ganti Foto"}
                </Button>
              </form>
            </div>
          </div>

          {/* Kolom Kanan: Informasi & Password */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Kartu Informasi Profil */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informasi Profil</h2>
              <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
                <Input type="text" name="fullname" label="Username" defaultValue={profile.fullname} placeholder={profile.fullname || "Masukkan username Anda"} />
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  defaultValue={profile.email}
                  placeholder={profile.email || "Masukkan email Anda"}
                  disabled // Email is usually not changeable
                />
                <Button type="submit" className="w-full sm:w-auto py-2.5 px-6 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 self-end" disabled={loading === "profile"}>
                  {loading === "profile" ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </form>
            </div>

            {/* Kartu Ganti Password */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ubah Password</h2>
              <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
                <Input type="password" name="oldPassword" label="Password Lama" placeholder="Masukkan password lama" disabled={profile.type === "google"} />
                <Input type="password" name="newPassword" label="Password Baru" placeholder="Masukkan password baru" disabled={profile.type === "google"} />
                <Button className="w-full sm:w-auto py-2.5 px-6 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 self-end" disabled={loading === "password" || profile.type === "google"}>
                  {loading === "password" ? "Memperbarui..." : "Ubah Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MemeberLayout>
  );
};
export default ProfileMemberview;
