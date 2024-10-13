const Button = ({ type, children, disabled, className }) => {
  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
