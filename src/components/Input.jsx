const Input = (props) => {
  const { label, type, id } = props; // is an object

  return (
    <>
      <label>{label}</label>
      <input id={id} title={label} type={type} />
    </>
  );
};

export default Input;
