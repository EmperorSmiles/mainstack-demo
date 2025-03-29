"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/assets/mainstack-logo.svg";
import { FiBarChart2, FiUsers, FiGrid } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { FaMoneyBills } from "react-icons/fa6";
import UserProfile from "./UserProfile";

const menuItems = [
  { label: "Home", href: "/", icon: GoHome },
  { label: "Analytics", href: "/analytics", icon: FiBarChart2 },
  { label: "Revenue", href: "/revenue", icon: FaMoneyBills },
  { label: "CRM", href: "/crm", icon: FiUsers },
  { label: "Apps", href: "/apps", icon: FiGrid },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white text-black/80 p-4 flex items-center justify-between rounded-full shadow-md w-auto ml-2 mr-2 mt-2 z-20 fixed top-0 left-0 right-0 md:left-2 md:right-2 md:top-2">
      {/* Logo */}
      <Image src={Logo} alt=" Logo" />

      {/* Menu Items */}
      <ul className="flex gap-6">
        {menuItems.map(({ label, href, icon: Icon }, index) => {
          const isActive = pathname === href;
          return (
            <Link key={index} href={href} className="outline-none">
              <li
                className={`flex items-center gap-1 p-2 rounded-xl transition-colors duration-300 group hover:cursor-pointer ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-black/80"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-white" : ""}`} />
                <span>{label}</span>
              </li>
            </Link>
          );
        })}
      </ul>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};

export default NavBar;
