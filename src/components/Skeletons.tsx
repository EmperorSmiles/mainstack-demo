import React from "react";

export function BalanceLoading() {
  return <div className="bg-gray-300 animate-pulse h-8 w-20"></div>;
}

export function ChartLoading() {
  return <div className="bg-gray-300 animate-pulse h-3/4 w-full"></div>;
}

export function BalanceDetailsLoading() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
          <div className="bg-gray-300 animate-pulse h-5 w-3/4"></div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
          <div className="bg-gray-300 animate-pulse h-5 w-3/4"></div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
          <div className="bg-gray-300 animate-pulse h-5 w-3/4"></div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
          <div className="bg-gray-300 animate-pulse h-5 w-3/4"></div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
          <div className="bg-gray-300 animate-pulse h-5 w-3/4"></div>
        </div>
      </div>
    </div>
  );
}
