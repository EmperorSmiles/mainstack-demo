import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { DatePicker } from "./DatePicker";

const FilterCard = () => {
  return (
    <Card className="w-2/6 h-full bg-white shadow-md rounded-lg p-4">
      <CardHeader className="text-xl font-medium">Filter</CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <DatePicker />
          <DatePicker />
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
