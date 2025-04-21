import styles from "./Select.module.scss";

type SelectProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  options?: Array<OptionProps>;
};

type OptionProps = {
  value: string;
  label: string;
};

const Select = (props: SelectProps) => {
  const { name, label, defaultValue, disabled, options } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <select className={styles.container__select} name={name} id={name} defaultValue={defaultValue} disabled={disabled}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
