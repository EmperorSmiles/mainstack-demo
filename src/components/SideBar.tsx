import React from "react";
import Image from "next/image";

import LinkProduct from "@/assets/LinkProduct Icons.png";
import Paper from "@/assets/PaperProduct Icons.png";
import Folder from "@/assets/FolderProduct Icons.png";
import ProductIcon from "@/assets/Product Icons.png";

const menuItems = [
  { label: "Link In Bio", href: "/", icon: LinkProduct },
  { label: "Store", href: "/", icon: ProductIcon },
  { label: "MediaKit", href: "/", icon: Folder },
  { label: "Invoicing", href: "/", icon: Paper },
];

const SideBar = () => {
  return (
    <aside className="w-auto h-auto fixed top-50 left-0 rounded-3xl shadow-md bg-white p-4">
      <ul className="flex flex-col gap-4">
        {menuItems.map(({ label, href, icon }, index) => (
          <li key={index} className="relative">
            <a
              href={href}
              className="p-2 flex items-center gap-3 grayscale hover:grayscale-0 transition-colors duration-300"
            >
              <div className="relative">
                <div className="group">
                  <Image src={icon} alt={label} className="w-8 h-8" />
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {label}
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
