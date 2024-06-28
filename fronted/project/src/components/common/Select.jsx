import { Field, ErrorMessage } from "formik";

const SelectField = ({ name, label, options }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        id={name}
        className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select an option</option>
        {options.map((option, i) => (
          <option key={i} value={option.product_name}>
            {option.product_name.toUpperCase()}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};
export default SelectField;
