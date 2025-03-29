import Link from "next/link";
import Image from "next/image";
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
  return (
    <nav className="bg-white text-black/80 p-4 flex items-center justify-between rounded-3xl shadow-md w-auto ml-2 mr-2 mt-2">
      {/* Logo */}
      <Image src={Logo} alt="Mainstack Logo" />

      {/* Menu Items */}
      <ul className="flex gap-6">
        {menuItems.map(({ label, href, icon: Icon }, index) => (
          <li
            key={index}
            className="flex items-center gap-1 hover:bg-black hover:text-white p-2 rounded-xl transition-colors duration-300"
          >
            <Icon className="w-6 h-6 " />
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>

      {/* User Profile */}
      <UserProfile />
    </nav>
  );
};

export default NavBar;
