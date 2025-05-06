import styles from "./Login.module.scss";
import { Google } from "@mui/icons-material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = ({ setToaster }: { setToaster: Dispatch<SetStateAction<{}>> }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl,
      });
      if (!res?.error) {
        setLoading(false);
        setToaster({ message: "Login Success", varian: "Succes" });
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setToaster({ message: "Login Failed", varian: "Error" });
      }
    } catch (error) {
      setLoading(false);
      setToaster({ message: "Login Failed", varian: "Error" });
    }
  };
  return (
    <AuthLayout title="Login" link="/auth/register" linkTitle="sign up" description="dont have an account?" setToaster={setToaster}>
      <form onSubmit={handlesubmit}>
        <Input name="email" label="Email" type="email" placeholder="masukan email" />
        <Input name="password" label="Password" type="password" placeholder="masukkan password" />

        <Button type="submit" varian="primary" className={styles.login__form__button}>
          {loading ? "loading..." : "Login"}
        </Button>
      </form>
      <Button type="button" varian="primary" className={styles.login__form__button} onClick={() => signIn("google", { callbackUrl: callbackUrl, redirect: false })}>
        {<Google className={styles.login__form__button__icon} />}Login with Google
      </Button>
    </AuthLayout>
  );
};

export default LoginView;
