import Link from "next/link"
import { Tooltip } from "react-tooltip"

import Toggle from "@components/Toggle"
import { Text } from "@radix-ui/themes"
import { HomeIcon, SquaresPlusIcon, TableCellsIcon } from "@heroicons/react/20/solid"
import { Item } from "./SidebarComponents/SidebarNavItem"
import { SidebarFooter } from "./SidebarComponents/SidebarFooter"

const navItems = [
  {
    id: 1,
    href: "/",
    name: "Dashboard",
    icon: HomeIcon,
  },
  {
    id: 2,
    href: "/integrations/import-dataset",
    name: "Datasets",
    icon: TableCellsIcon,
  },
  {
    id: 3,
    href: "/integrations",
    name: "Integrations",
    icon: SquaresPlusIcon,
  },
  {
    id: 4,
    href: "/integrations/export-crm",
    name: "CRM",
    group: "integrations",
  },
  {
    id: 5,
    href: "/integrations/export-ads",
    name: "Ad Platforms",
    group: "integrations",
  },
]

const groupedNavItems = navItems.reduce((acc, item) => {
  if (item.group) {
    if (!acc[item.group]) {
      acc[item.group] = []
    }
    acc[item.group].push(item)
  } else {
    acc.root = acc.root || []
    acc.root.push(item)
  }
  return acc
}, {})

export default function Sidebar({ onLogOut, embedMode, setEmbedMode, devMode, setDevMode }) {
  return (
    <div className="flex shrink-0 flex-row items-end justify-between gap-4 border-r border-slate-200 bg-slate-50 p-2 md:h-screen md:w-[240px] md:flex-col md:items-center md:justify-start md:p-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white p-3 shadow">
            <i className="fa-solid fa-magnet leading-none" />
          </div>
          <Text className="text-sm font-medium leading-none">Marketing Magnet</Text>
        </div>
        {/* Mobile Navbar */}
        <nav className="flex flex-row items-end gap-1 md:hidden">
          {navItems.map((item) => (
            <Item key={item.id} name={item.name} href={item.href} />
          ))}
        </nav>
      </div>
      {/* Desktop Navbar */}
      <nav className="hidden w-full flex-col gap-1 self-start md:flex">
        {groupedNavItems.root?.map((item) => (
          <Item key={item.id} name={item.name} href={item.href} icon={item.icon} />
        ))}
        {Object.entries(groupedNavItems).map(
          ([group, items]) =>
            group !== "root" && (
              <div key={group} className="ml-4 flex flex-col gap-1 border-l border-slate-200 pl-3">
                {items.map((item) => (
                  <Item key={item.id} name={item.name} href={item.href} icon={item.icon} />
                ))}
              </div>
            ),
        )}
      </nav>

      <SidebarFooter
        onLogOut={onLogOut}
        embedMode={embedMode}
        setEmbedMode={setEmbedMode}
        devMode={devMode}
        setDevMode={setDevMode}
      />
    </div>
  )
}