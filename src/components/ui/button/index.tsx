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
    <button
      className={`rounded-lg text-lg flex items-center justify-center p-2 mx-1.5 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-5 ${className} ${
        varian === "primary" ? "bg-blue-600 text-white" : varian === "secondary" ? "bg-gray-600 text-white" : varian === "danger" ? "bg-red-600 text-white" : varian === "normal" ? "bg-black text-white" : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
