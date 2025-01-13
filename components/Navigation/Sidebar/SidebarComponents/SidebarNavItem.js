import { usePathname } from "next/navigation"
import Link from "next/link"
import { Text } from "@radix-ui/themes"

export function Item({ name, href, icon: Icon }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex cursor-pointer flex-row items-center gap-2 rounded px-2 py-2 text-sm font-medium leading-none   ${
        isActive
          ? "bg-slate-200 text-slate-900 "
          : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-700"
      }`}
    >
      {Icon && <Icon className={`h-4 ${isActive ? "text-slate-900" : ""}`} />}
      <Text>{name}</Text>
    </Link>
  )
}
