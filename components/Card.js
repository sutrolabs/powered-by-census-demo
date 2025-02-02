export default function Card({ className, disabled, children }) {
  return (
    <div
      className={`
        rounded-md border border-neutral-200  bg-white
        px-3 py-5
        shadow-sm transition
        data-[disabled]:border-neutral-200
        ${className}
      `}
      data-disabled={disabled ? "" : null}
    >
      {children}
    </div>
  )
}
