import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Textarea = ({ Controller, control, label, name, id, error: {errors}}) => {

  
  // Custom Tool Bar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="sm:col-span-2">
          <label
            htmlFor="text_area"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            {label}
          </label>
          <ReactQuill
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            modules={modules}
            formats={formats}
          />
          {errors[id] && (
            <p className="text-sm text-red-500">{errors[id].message}</p>
          )}
        </div>
      )}
    />
  );
};

export default Textarea;
