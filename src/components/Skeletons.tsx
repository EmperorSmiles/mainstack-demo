import React from "react";

export function BalanceLoading() {
  return <div className="bg-gray-300 animate-pulse h-8 w-20"></div>;
}

export function ChartLoading() {
  return <div className="bg-gray-300 animate-pulse max-auto w-auto"></div>;
}

export function TransactionsLoading() {
  return (
    <ul className="space-y-4 w-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <li
          key={index}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 animate-pulse"
        >
          {/* Left side: icon + text */}
          <div className="flex items-center gap-3">
            {/* Placeholder for icon */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            <div>
              {/* Placeholder for product name or transaction type */}
              <div className="h-4 w-28 bg-gray-300 rounded"></div>

              {/* Placeholder for author or status */}
              <div className="mt-1 h-3 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Right side: amount + date */}
          <div className="flex flex-col gap-0.5">
            {/* Placeholder for amount */}
            <div className="h-4 w-16 bg-gray-300 rounded"></div>

            {/* Placeholder for date */}
            <div className="h-3 w-12 bg-gray-300 rounded"></div>
          </div>
        </li>
      ))}
    </ul>
  );
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
