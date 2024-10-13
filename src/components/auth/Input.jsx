const Input = ({
  id,
  onChange,
  name,
  placeholder,
  type,
  value,
  defaultValue,
  disabled,
  aria,
  classname,
}) => {
  return (
    <input
      aria-disabled={aria}
      id={id}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      type={type}
      required
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
      className={`w-full border-transparent bg-transparent p-1 text-sm !outline-none focus:border-transparent focus:ring-0 ${classname}`}
    />
  );
};

export default Input;
