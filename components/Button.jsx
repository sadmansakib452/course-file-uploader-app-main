import clsx from "clsx";

export default function Button({
  children,
  className = "",
  variant = "primary",
  disabled = false,
  ...rest
}) {
  return (
    <button
      {...rest}
      className={clsx(
        "py-2 px-4 rounded font-bold hover:text-primary-400 animated-underline",
        "focus:outline-none focus-visible:ring ring-primary-400 ring-offset-2",
        "border border-gray-600",
        {
          "bg-dark text-white": variant === "primary" && !disabled,
          "bg-white text-dark hover:bg-gray-200 hover:text-dark transition-colors":
            variant === "secondary" && !disabled,
          "bg-gray-400 text-gray-700 cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
