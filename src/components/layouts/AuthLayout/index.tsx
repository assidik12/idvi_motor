import styles from "./Auth.module.scss";
import Link from "next/link";

type AuthLayoutProps = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkTitle: string;
  description: string;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { error, title, children, link, linkTitle, description } = props;
  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      <div className={styles.auth__form}>
        <p className={styles.auth__form__error}>{error}</p>
        {children}
      </div>
      <p className={styles.auth__desc}>
        {description} <Link href={link}>{linkTitle}</Link>
      </p>
    </div>
  );
};

export default AuthLayout;
