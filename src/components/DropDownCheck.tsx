"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RxChevronDown } from "react-icons/rx";

// Define the type for items
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
  const [selected, setSelected] = useState<string[]>(defaultSelected);
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

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected, onChange]);

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Map selected item IDs to their labels
  const selectedLabels = items
    .filter((item) => selected.includes(item.id))
    .map((item) => item.label)
    .join(", ");

  return (
    <div ref={containerRef} className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={buttonVariant} className="w-full justify-between">
            <span className="truncate text-left">
              {selected.length > 0 ? selectedLabels : placeholder}
            </span>
            <RxChevronDown className="ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 border-t-0 rounded-t-none"
          style={{ width: `${containerWidth}px` }}
          side="bottom"
          align="start"
          sideOffset={3}
        >
          <div className="space-y-2 p-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 pl-6 cursor-pointer"
                onClick={() => handleToggle(item.id)}
              >
                <Checkbox
                  id={item.id}
                  checked={selected.includes(item.id)}
                  onCheckedChange={() => handleToggle(item.id)}
                  className="border-2 border-black"
                />
                <label
                  htmlFor={item.id}
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
