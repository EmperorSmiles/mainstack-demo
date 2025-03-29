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
  { label: "Payments", href: "/donate", icon: FaMoneyBills },
  { label: "CRM", href: "/crm", icon: FiUsers },
  { label: "Apps", href: "/apps", icon: FiGrid },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white text-black/80 p-4 flex items-center justify-between rounded-full shadow-md w-auto ml-2 mr-2 mt-2">
      {/* Logo */}
      <Image src={Logo} alt="Mainstack Logo" />

      {/* Menu Items */}
      <ul className="flex gap-6">
        {menuItems.map(({ label, href, icon: Icon }, index) => {
          const isActive = pathname === href;
          return (
            <li
              key={index}
              className={`flex items-center gap-1 p-2 rounded-xl transition-colors duration-300 ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-200 text-black/80"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-white" : ""}`} />
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};

export default NavBar;
