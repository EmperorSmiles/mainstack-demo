"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/assets/mainstack-logo.svg";
import {
  FiBarChart2,
  FiUsers,
  FiGrid,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { GoHome, GoBug } from "react-icons/go";
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlineSwitchAccount } from "react-icons/md";
import UserProfile from "./UserProfile";
import { useEffect, useState, useRef } from "react";
import { User } from "@/types/type";

const menuItems = [
  { label: "Home", href: "/", icon: GoHome },
  { label: "Analytics", href: "/analytics", icon: FiBarChart2 },
  { label: "Revenue", href: "/revenue", icon: FaMoneyBills },
  { label: "CRM", href: "/crm", icon: FiUsers },
  { label: "Apps", href: "/apps", icon: FiGrid },
];

const userMenuItems = [
  { label: "Settings", href: "/revenue", icon: FiSettings },
  { label: "Purchase History", href: "/revenue", icon: FaMoneyBills },
  { label: "Refer and Earn", href: "/revenue", icon: FiUsers },
  { label: "Integrations", href: "/revenue", icon: FiGrid },
  { label: "Report Bug", href: "/revenue", icon: GoBug },
  { label: "Switch Account", href: "/revenue", icon: MdOutlineSwitchAccount },
  { label: "Sign Out Out", href: "/revenue", icon: FiLogOut },
];

const NavBar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await fetch(
          "https://fe-task-api.mainstack.io/user"
        ).then((res) => res.json());
        setUser(userRes);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    };

    fetchUser();
    // console.log(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = () => {
    if (user) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
    } else {
      return "JD";
    }
  };

  const getFullName = () => {
    if (user) {
      return `${user.first_name} ${user.last_name}`;
    } else {
      return "John Doe";
    }
  };

  const getEmail = () => {
    if (user) {
      return user.email;
    } else {
      return "john.doe@example.com";
    }
  };

  return (
    <div className="bg-white text-black/80 p-4 flex items-center justify-between rounded-full shadow-md w-auto ml-2 mr-2 mt-2 z-20 fixed top-0 left-0 right-0 md:left-2 md:right-2 md:top-2">
      {/* Logo */}
      <Image src={Logo} alt=" Logo" />

      {/* Menu Items */}
      <ul className="md:flex hidden gap-6">
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

      <div className="relative" ref={menuRef}>
        <UserProfile user={user} onClick={() => setShowMenu(!showMenu)} />

        {showMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-30">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white text-sm font-bold rounded-full">
                  {getInitials()}
                </div>
                <div>
                  <div className="font-medium">{getFullName()}</div>
                  <div className="text-sm text-gray-500">{getEmail()}</div>
                </div>
              </div>
            </div>
            <div className="py-2">
              {userMenuItems.map(({ label, href, icon: Icon }, index) => (
                <Link key={index} href={href}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    <Icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">{label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
