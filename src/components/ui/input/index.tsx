import styles from "./input.module.scss";

type InputProps = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
};

const Input = (props: InputProps) => {
  return (
    <div className={styles.container}>
      {props.label && (
        <label htmlFor={props.name} className={styles.container__label}>
          {props.label}
        </label>
      )}
      <input type={props.type} name={props.name} placeholder={props.placeholder} id={props.name} className={styles.container__input} required={true} />
    </div>
  );
};

export default Input;
