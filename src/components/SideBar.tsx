import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import LinkProduct from "@/assets/LinkInBio.svg";
import Paper from "@/assets/Store.svg";
import Folder from "@/assets/MediaKit.svg";
import ProductIcon from "@/assets/Invoicing.svg";

const menuItems = [
  { label: "LinkInBio", href: "/", icon: LinkProduct },
  { label: "Store", href: "/", icon: ProductIcon },
  { label: "MediaKit", href: "/", icon: Folder },
  { label: "Invoicing", href: "/", icon: Paper },
];

const SideBar = () => {
  return (
    <aside className="w-auto h-auto fixed top-50 left-0 rounded-full shadow-md bg-white p-4">
      <TooltipProvider>
        <ul className="flex flex-col gap-4">
          {menuItems.map(({ label, href, icon }, index) => (
            <li key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={href}
                    className="p-2 flex items-center gap-3 grayscale hover:grayscale-0 transition-colors duration-300"
                  >
                    <Image src={icon} alt={label} className="w-8 h-8" />
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black text-white text-xs py-2 px-3 relative"
                  sideOffset={-5}
                >
                  <div className="absolute w-2 h-2 bg-black transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
                  {label}
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </aside>
  );
};

export default SideBar;
