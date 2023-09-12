const Input = (props) => {
  const { label, type, id, onChange, value } = props; // is an object

  return (
    <div className="w-full mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        title={label}
        type={type}
        onChange={onChange}
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  text-center"
      />
    </div>
  );
};

export default Input;
