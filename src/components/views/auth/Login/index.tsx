import Link from "next/link";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = (props: any) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        console.log(res);
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
        <form onSubmit={handlesubmit}>
          <div className={styles.login__form__item}>
            <label className={styles.login__form__item__label} htmlFor="email">
              email
            </label>
            <input className={styles.login__form__item__input} type="email" name="email" required={true} />
            <label className={styles.login__form__item__label} htmlFor="password">
              password
            </label>
            <input className={styles.login__form__item__input} type="password" name="password" required={true} min={10} />
          </div>
          <button className={styles.login__form__button} type="submit">
            Login
          </button>
        </form>
        <p>{error}</p>
      </div>
      <p>
        don`t have an account? <Link href={"/auth/register"}>sign up</Link>
      </p>
    </div>
  );
};

export default LoginView;
