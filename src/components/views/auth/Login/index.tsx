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
        setToaster({ message: "Login Success", varian: "Success" });
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
      <form onSubmit={handlesubmit} className="w-full flex flex-col gap-4 items-center justify-center rounded-xl mb-5">
        <Input name="email" label="Email" type="email" placeholder="masukan email" />
        <Input name="password" label="Password" type="password" placeholder="masukkan password" />

        <Button type="submit" varian="primary" className={"w-2/4 mb-2.5 p-2"}>
          {loading ? "loading..." : "Login"}
        </Button>
      </form>
      <Button type="button" varian="primary" className={"w-2/4 mb-2.5 p-2"} onClick={() => signIn("google", { callbackUrl: callbackUrl, redirect: false })}>
        {<Google className={"mr-2 Text-2xl"} />}Login with Google
      </Button>
    </AuthLayout>
  );
};

export default LoginView;
