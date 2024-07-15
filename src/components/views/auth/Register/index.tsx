import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

const RegisterView = (props: any) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
      push("/auth/login");
    } else {
      form.reset();
      setError("Invalid email or password");
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      <div className={styles.register__form}>
        <form onSubmit={handlesubmit}>
          <div className={styles.register__form__item}>
            <Input name="username" label="username" type="text" placeholder="masukkan username" />
            <Input name="email" label="Email" type="email" placeholder="masukkan Email" />
            <Input name="password" label="Password" type="password" placeholder="masukkan password" />
            <Button type="submit" varian="primary" className={styles.register__form__button}>
              {loading ? "loading..." : "Register"}
            </Button>
          </div>
        </form>
        <p className={styles.register__form__error}>{error ? "Invalid email or password" : ""}</p>
      </div>
      <p>
        have an account? <Link href={"/auth/login"}>sign in</Link>
      </p>
    </div>
  );
};

export default RegisterView;
