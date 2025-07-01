import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type AuthLayoutProps = {
  title?: string;
  children: React.ReactNode;
  link: string;
  setToaster: Dispatch<SetStateAction<{}>>;
  linkTitle: string;
  description: string;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { title, children, link, linkTitle, description } = props;
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="w-2/5 p-5 shadow-lg rounded-xl mb-5 flex flex-col items-center gap-2">{children}</div>
      <p className="mb-2 text-sm">
        {description}{" "}
        <Link href={link} className="text-blue-500 hover:underline">
          {linkTitle}
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
