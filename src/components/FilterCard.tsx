import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { DatePicker } from "./DatePicker";
import { DropDownCheck, CheckboxItem } from "./DropDownCheck";
import { Button } from "./ui/button";
import { RxCross1 } from "react-icons/rx";
// import { Transaction } from "@/types/type";

const transactionTypes: CheckboxItem[] = [
  { id: "withdrawal", label: "Withdrawal" },
  { id: "deposit", label: "Deposit" },
];

const StatusTypes: CheckboxItem[] = [
  { id: "successful", label: "Successful" },
  { id: "pending", label: "Pending" },
  { id: "failed", label: "Failed" },
];

interface DateFilter {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface Filters {
  dateRange: DateFilter;
  transactionTypes: string[];
  transactionStatus: string[];
}

interface FilterCardProps {
  displayFilter: () => void;
  onApplyFilters: (filters: Filters) => void;
  onClearFilters: () => void;
  currentFilters: Filters;
  activeFilterCount: number;
}

const FilterCard = ({
  displayFilter,
  onApplyFilters,
  onClearFilters,
  currentFilters,
}: FilterCardProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(
    currentFilters.dateRange.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    currentFilters.dateRange.endDate
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    currentFilters.transactionTypes
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    currentFilters.transactionStatus
  );

  useEffect(() => {
    // Delay setting isOpening to allow animation
    const timeout = setTimeout(() => setIsOpening(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      displayFilter();
    }, 300); // Match with transition duration
  };

  const handleApplyFilters = () => {
    const newFilters: Filters = {
      dateRange: {
        startDate,
        endDate,
      },
      transactionTypes: selectedTypes,
      transactionStatus: selectedStatuses,
    };

    onApplyFilters(newFilters);
    handleClose();
  };

  const handleClearFilters = () => {
    // Clear local state
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedTypes([]);
    setSelectedStatuses([]);

    // Notify parent
    onClearFilters();
  };

  const hasFilters =
    (startDate ? 1 : 0) +
    (endDate ? 1 : 0) +
    selectedTypes.length +
    selectedStatuses.length;

  const dateBtn = ["Today", "Last 7 days", "This month", "Last 3 months"];

  return (
    <Card
      className={`w-3/4 md:w-2/6 h-screen bg-white shadow-md rounded-lg fixed top-0 right-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpening && !isClosing ? "translate-x-0" : "translate-x-full"}`}
    >
      <CardHeader className="text-sm md:text-lg font-medium">
        <div className="flex items-center justify-between">
          <h1>Filter</h1>
          <RxCross1
            className="text-lg hover:cursor-pointer hover:text-2xl"
            onClick={() => handleClose()}
          />
        </div>
        <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
          {dateBtn.map((btn) => (
            <Button key={btn} variant="secondary" className="m-2">
              {btn}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-1">
          <p className="text-sm md:text-lg font-medium">Date Range</p>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div className="flex-1 focus:bg-border-4 focus:bg-border-black hover:cursor-pointer">
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                placeholder="Start date"
              />
            </div>
            <div className="flex-1 hover:cursor-pointer">
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                placeholder="End date"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm md:text-lg font-medium mt-2">
            Transaction Type
          </p>
          <DropDownCheck
            placeholder="Select Transaction Type"
            items={transactionTypes}
            onChange={setSelectedTypes}
            defaultSelected={selectedTypes}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm md:text-lg font-medium mt-4">
            Transaction Status
          </p>
          <DropDownCheck
            placeholder="Select Transaction Status"
            items={StatusTypes}
            onChange={setSelectedStatuses}
            defaultSelected={selectedStatuses}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-between mt-auto mb-2 md:mb-4">
        <Button
          className="w-1/2 cursor-pointer hover:bg-gray-300"
          variant="secondary"
          onClick={hasFilters ? handleClearFilters : handleClose}
        >
          {hasFilters ? "Clear" : "Close"}
        </Button>
        <Button
          className="w-1/2 cursor-pointer"
          variant="default"
          onClick={handleApplyFilters}
          disabled={!hasFilters}
        >
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilterCard;
