import styles from "./input.module.scss";

type InputProps = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = (props: InputProps) => {
  return (
    <div className={styles.container}>
      {props.label && (
        <label htmlFor={props.name} className={styles.container__label}>
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        id={props.name}
        className={styles.container__input}
        required={true}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Input;
