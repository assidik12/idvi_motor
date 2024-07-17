import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import AUthService from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

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
    const result = await AUthService.registerAccouunt(data);
    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      form.reset();
      setError("Invalid email or password");
    }
  };
  return (
    <AuthLayout link="/auth/login" description="have an account?" linkTitle="sign in" title="Register" error={error}>
      <form onSubmit={handlesubmit}>
        <div className={styles.register__form__item}>
          <Input name="username" label="Username" type="text" placeholder="masukkan username" />
          <Input name="email" label="Email" type="email" placeholder="masukkan email" />
          <Input name="password" label="Password" type="password" placeholder="masukkan password" />
          <Button type="submit" varian="primary" className={styles.register__form__button}>
            {loading ? "loading..." : "Register"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
