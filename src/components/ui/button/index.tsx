import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  varian?: string;
  className?: string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { type, onClick, children, varian = "primary", className } = props;
  return (
    <button className={styles.button + " " + styles[varian] + " " + className} type={type} onClick={onClick} disabled={props.disabled}>
      {children}
    </button>
  );
};

export default Button;
