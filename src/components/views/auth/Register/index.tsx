import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const RegisterView = (props: any) => {
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      push("/api/auth/login");
    } else {
      console.log(result);
      setError(result.statusText);
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      <div className={styles.register__form}>
        <form onSubmit={handlesubmit}>
          <div className={styles.register__form__item}>
            <label className={styles.register__form__item__label} htmlFor="username">
              username
            </label>
            <input className={styles.register__form__item__input} type="text" name="username" required={true} />
            <label className={styles.register__form__item__label} htmlFor="email">
              email
            </label>
            <input className={styles.register__form__item__input} type="email" name="email" required={true} />
            <label className={styles.register__form__item__label} htmlFor="password">
              password
            </label>
            <input className={styles.register__form__item__input} type="password" name="password" required={true} min={10} />
          </div>
          <button className={styles.register__form__button} type="submit">
            Register
          </button>
        </form>
        <p>{error}</p>
      </div>
      <p>
        have an account? <Link href={"/auth/login"}>sign in</Link>
      </p>
    </div>
  );
};

export default RegisterView;
