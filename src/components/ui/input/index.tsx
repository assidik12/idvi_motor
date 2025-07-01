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
    <div className="w-4/5 mb-4 flex flex-col">
      {props.label && (
        <label htmlFor={props.name} className="mb-2.5 text-lg">
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
        required={true}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        className="min-w-4/5 p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-70"
      />
    </div>
  );
};

export default Input;
