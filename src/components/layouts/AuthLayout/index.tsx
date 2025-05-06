import { Dispatch, SetStateAction } from "react";
import styles from "./Auth.module.scss";
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
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      <div className={styles.auth__form}>{children}</div>
      <p className={styles.auth__desc}>
        {description} <Link href={link}>{linkTitle}</Link>
      </p>
    </div>
  );
};

export default AuthLayout;
