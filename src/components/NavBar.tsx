import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/mainstack-logo.svg";
import { FiBarChart2, FiUsers, FiGrid, FiMenu } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { FaMoneyBills, FaRegBell } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";

const menuItems = [
  { label: "Home", href: "/", icon: GoHome },
  { label: "Analytics", href: "/analytics", icon: FiBarChart2 },
  { label: "Payments", href: "/donate", icon: FaMoneyBills },
  { label: "CRM", href: "/crm", icon: FiUsers },
  { label: "Apps", href: "/apps", icon: FiGrid },
];

const NavBar = () => {
  return (
    <nav className="bg-white text-black/80 p-4 flex items-center justify-between">
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
      <div className="flex justify-center items-center gap-1">
        <FaRegBell />
        <BsChatLeftText className="ml-4" />
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-2xl w-20">
          {/* Large Circle with Initials */}
          <div className="w-4 h-4 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white text-sm font-bold rounded-full">
            OJ
          </div>

          {/* Hamburger Icon */}
          <FiMenu className="text-gray-600 w-6 h-6" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
