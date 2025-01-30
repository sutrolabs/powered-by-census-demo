export function Anchor({ className, href, children }) {
  return (
    <a
      className={`
        text-emerald-700
        underline
        transition duration-75
        hover:text-emerald-500
        ${className}`}
      href={href}
    >
      {children}
    </a>
  )
}
