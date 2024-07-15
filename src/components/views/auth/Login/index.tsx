import Link from "next/link";
import styles from "./Login.module.scss";
import { Google } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

const LoginView = (props: any) => {
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
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Invalid email or password");
    }
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <div className={styles.login__form}>
        <p className={styles.login__form__error}>{error ? "Invalid email or password" : ""}</p>
        <form onSubmit={handlesubmit}>
          <Input name="email" label="Email" type="email" placeholder="Email" />
          <Input name="password" label="Password" type="password" placeholder="masukkan password" />

          <Button type="submit" varian="primary" className={styles.login__form__button}>
            {loading ? "loading..." : "Login"}
          </Button>
        </form>
        <Button type="button" varian="primary" className={styles.login__form__button} onClick={() => signIn("google", { callbackUrl: callbackUrl, redirect: false })}>
          {<Google className={styles.login__form__button__icon} />}Login with Google
        </Button>
      </div>
      <p>
        don`t have an account? <Link href={"/auth/register"}>sign up</Link>
      </p>
    </div>
  );
};

export default LoginView;
