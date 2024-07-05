// Input.js
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";

export default function Input({
  label,
  placeholder = "",
  helperText,
  id,
  type = "text",
  readOnly = false,
  validation,
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Handle array of IDs from InstructorFeedback
  const errorId = Array.isArray(id) ? id[0] : id;
  console.log(errorId)

  return (
    <div>
      <label
        htmlFor={Array.isArray(id) ? id.join(" ") : id}
        className="block text-sm font-normal text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...register(Array.isArray(id) ? id : id, validation)}
          {...rest}
          type={type}
          name={Array.isArray(id) ? id[0] : id} // Use the first ID if it's an array
          id={Array.isArray(id) ? id.join(" ") : id} // Join IDs with a space if it's an array
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? "bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300"
              : errors[errorId]
              ? "focus:ring-red-500 border-red-500 focus:border-red-500"
              : "focus:ring-primary-500 border-gray-300 focus:border-primary-500",
            "block w-full rounded-md shadow-sm"
          )}
          placeholder={placeholder}
          aria-describedby={Array.isArray(id) ? id.join(" ") : id} // Join IDs with a space if it's an array
        />

        {errors[errorId] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <HiExclamationCircle className="text-xl text-red-500" />
          </div>
        )}
      </div>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {errors[errorId] && (
          <span className="text-sm text-red-500">
            {errors[errorId].message}
          </span>
        )}
      </div>
    </div>
  );
}
