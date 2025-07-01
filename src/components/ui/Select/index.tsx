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
    <div className="container w-80 mb-3 flex flex-col items-center">
      {label && (
        <label htmlFor={name} className="text-base mb-2">
          {label}
        </label>
      )}
      <select className="w-80 px-3 py-2 border-none border-b border-gray-300 rounded-sm disabled:cursor-not-allowed disabled:opacity-70" name={name} id={name} defaultValue={defaultValue} disabled={disabled}>
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
