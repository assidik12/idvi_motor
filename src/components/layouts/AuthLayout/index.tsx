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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold text-gray-800">{title}</h1>

      {/* Card / Box */}
      <div
        className="
          w-full max-w-md 
          p-6 sm:p-8 
          shadow-lg rounded-xl 
          bg-white 
          flex flex-col items-center gap-4
        "
      >
        {children}
      </div>

      {/* Link to register/login */}
      <p className="mt-4 text-lg text-gray-600">
        {description}{" "}
        <Link href={link} className="text-blue-500 font-medium hover:underline">
          {linkTitle}
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
