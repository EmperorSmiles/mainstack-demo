import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/mainstack-logo.svg";

const menuItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Analytics", href: "/analytics", icon: AnalyticsIcon },
  { label: "Payments", href: "/donate", icon: PaymentsIcon },
  //   { label: "CRM", href: "/crm", icon: CRMIcon },
  //   { label: "Apps", href: "/apps", icon: AppsIcon },
];

const NavBar = () => {
  return (
    <nav className="bg-white text-black p-4 flex items-center justify-between">
      {/* Logo */}
      <Image src={Logo} alt="Mainstack Logo" />

      {/* Menu Items */}
      <ul className="flex gap-6">
        {menuItems.map(({ label, href, icon: Icon }, index) => (
          <li
            key={index}
            className="flex items-center gap-2 hover:bg-black hover:text-white p-2 rounded"
          >
            <Icon className="w-6 h-6 hover:fill-white text-black" />
            <Link href={href} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
