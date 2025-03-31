"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RxChevronDown } from "react-icons/rx";

export type CheckboxItem = {
  id: string;
  label: string;
};

type DropDownCheckProps = {
  items: CheckboxItem[];
  placeholder?: string;
  onChange?: (selectedIds: string[]) => void;
  defaultSelected?: string[];
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  labelClassName?: string;
};

export function DropDownCheck({
  items,
  placeholder = "Select items...",
  onChange,
  defaultSelected = [],
  buttonVariant = "secondary",
  labelClassName = "text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer py-2",
}: DropDownCheckProps) {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (id: string) => {
    if (!onChange) return;

    const newSelected = defaultSelected.includes(id)
      ? defaultSelected.filter((item) => item !== id)
      : [...defaultSelected, id];

    onChange(newSelected);
  };

  const selectedLabels = items
    .filter((item) => defaultSelected.includes(item.id))
    .map((item) => item.label)
    .join(", ");

  return (
    <div ref={containerRef} className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={buttonVariant} className="w-full justify-between">
            <span className="truncate text-left">
              {defaultSelected.length > 0 ? selectedLabels : placeholder}
            </span>
            <RxChevronDown className="ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 border-t-0 rounded-t-none group"
          style={{ width: `${containerWidth}px` }}
          side="bottom"
          align="start"
          sideOffset={3}
        >
          <div className="space-y-2 p-4 group-hover:cursor-pointer">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 pl-6 "
                onClick={() => handleToggle(item.id)}
              >
                <Checkbox
                  id={item.id}
                  checked={defaultSelected.includes(item.id)}
                  // onCheckedChange={() => handleToggle(item.id)}
                  className="border-2 border-black"
                />
                <label
                  htmlFor={item.label}
                  className={`text-sm font-medium text-gray-700 ${
                    labelClassName || ""
                  }`}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
