import MemeberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Image from "next/image";
import style from "./MemberProfile.module.scss";
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
        setToaster({ message: "password succes updated", varian: "Succes" });
      }
    } catch (error) {
      setLoading("");
      form.reset();
      setToaster({ message: "password failed updated", varian: "Error" });
    }
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email?.value,
    };
    const resut = await UserServices.updateProfile(session.data?.accessToken, data);
    if (resut.status) {
      setLoading("");
      const { data } = await UserServices.getProfile(session.data?.accessToken);
      setProfile(data.data);
      setToaster({ message: "Profile updated successfully", varian: "Succes" });
    } else {
      setLoading("");
      setToaster({ message: "Failed to update profile", varian: "Error" });
    }
  };

  const handleChangeProfilePicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("image");

    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file.size > 1178600) {
      setToaster({ message: "Image size must be less than 1MB", varian: "Warning" });
    }
    if (file) {
      await uploadFile(profile.id, file, async (newImageUrl: string) => {
        setProfile({ ...profile, image: newImageUrl });
        const data = {
          image: newImageUrl,
        };
        const resut = await UserServices.updateProfile(session.data?.accessToken, data);
        if (resut.status) {
          setToaster({ message: "Profile picture updated successfully", type: "Succes" });
          form.reset();
          setLoading("");
        } else {
          setToaster({ message: "Failed to update profile picture", type: "Error" });
          form.reset();
          setLoading("");
        }
      });
    }
  };
  return (
    <MemeberLayout>
      <h1>profile user</h1>
      <div className={style.main}>
        <div className={style.main__row}>
          <div className={style.main__row__profile}>
            <form onSubmit={handleChangeProfilePicture} className={style.main__row__profile__form}>
              {profile.image ? (
                <Image src={profile.image} priority alt="profile" width={160} height={160} className={style.main__row__profile__image} />
              ) : (
                <div className={style.main__row__profile__image}>{profile?.fullname ? profile.fullname.charAt(0).toUpperCase() : ""}</div>
              )}
              <input
                type="file"
                className={style.main__row__profile__name}
                accept="image/*"
                name="image"
                id="image"
                onChange={(e: any) => {
                  e.preventDefault();
                }}
              />
              <Button type="submit" className={style.main__row__profile__button}>
                {loading === "image" ? "updating image..." : "change"}
              </Button>
            </form>
          </div>
          <div className={style.main__row__content}>
            <form className={style.main__row__content__form} onSubmit={handleUpdateProfile}>
              <Input type="text" name="fullname" label="Username" placeholder={profile.fullname} />
              <Input type="text" name="email" label="Email" placeholder={profile.email} />
              <Button type="submit" className={style.main__row__content__form__button}>
                {loading === "profile" ? "updating profile..." : "save"}
              </Button>
            </form>
          </div>
          <div className={style.main__row__password}>
            <form className={style.main__row__password__form} onSubmit={handleChangePassword}>
              <Input type="password" name="oldPassword" label="password lama" placeholder="masukan password lama" disabled={profile.type === "google"} />
              <Input type="password" name="newPassword" label="password baru" placeholder="masukkan password baru" disabled={profile.type === "google"} />
              <Button className={style.main__row__password__form__button} disabled={loading === "password" || profile.type === "google"}>
                {loading === "password" ? "updating password..." : "change password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemeberLayout>
  );
};
export default ProfileMemberview;
