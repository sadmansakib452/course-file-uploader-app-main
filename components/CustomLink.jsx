import clsx from "clsx"
import UnstyledLink from "./UnstyledLink"

export default function CustomLink({ children, className = "", ...rest }) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        "inline-flex items-center font-bold animated-underline",
        className
      )}
    >
      {children}
    </UnstyledLink>
  )
}
