import { Text } from "@radix-ui/themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Item({ name, href, icon: Icon }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`group flex cursor-pointer flex-row items-center gap-2 rounded p-2  text-sm font-medium leading-none no-underline transition-all duration-75  ${
        isActive
          ? "  bg-neutral-200 text-neutral-700 hover:bg-neutral-200/50 hover:text-neutral-700"
          : "border-transparent text-neutral-500 hover:bg-neutral-200/50 hover:text-neutral-700"
      }`}
    >
      {Icon && (
        <Icon
          className={`h-4 w-4 transition-all duration-75 ${
            isActive ? "text-neutral-600" : "text-neutral-400 group-hover:text-neutral-500"
          }`}
        />
      )}
      <Text>{name}</Text>
    </Link>
  )
}
