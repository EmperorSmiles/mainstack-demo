import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Transaction } from "@/types/type";
import {
  RxArrowBottomLeft,
  RxArrowDown,
  RxChevronDown,
  RxArrowTopRight,
} from "react-icons/rx";
import { TransactionsLoading } from "./Skeletons";
interface TransactionsBlockProps {
  transactions: Transaction[];
  loading: boolean;
  displayFilter: () => void;
  activeFilterCount: number;
}

const TransactionsBlock: React.FC<TransactionsBlockProps> = ({
  transactions,
  loading,
  displayFilter,
  activeFilterCount,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-xl font-bold text-nowrap">
              {transactions.length} Transactions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your transactions for the last 7 days
            </p>
          </div>
          <div className="flex gap-1 md:gap-2">
            <Button
              variant={activeFilterCount > 0 ? `default` : `secondary`}
              className="group rounded-full hover:cursor-pointer hover:bg-gray-300 hover:text-black"
              onClick={() => displayFilter()}
            >
              Filter{" "}
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-white rounded-full transition-colors group-hover:bg-black group-hover:text-white">
                  {activeFilterCount}
                </span>
              )}
              <RxChevronDown className="ml-2 transition-colors group-hover:text-black" />
            </Button>

            <Button variant="secondary" className="rounded-full">
              Export List
              <RxArrowDown className="mL-2" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <TransactionsLoading />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                No matching transaction found for the selected filter Change
                your filters to see more results, or add a new product.{" "}
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {transactions.map((transaction, index) => {
                const { amount, metadata, status, type, date } = transaction;
                const productName = (metadata as { product_name?: string })
                  ?.product_name;
                const author = metadata?.name;
                const isDeposit = type === "deposit";
                const isSuccessful = status === "successful";
                // const isWithdraw = type === "withdrawal";

                return (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50"
                  >
                    {/* Left side: icon + text */}
                    <div className="flex items-center gap-3">
                      {/* Icon changes color if successful or not */}
                      <div
                        className={`w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                          isDeposit ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {isDeposit ? (
                          <RxArrowBottomLeft className=" w-2 h-2 md:w-5 md:h-5text-green-600" />
                        ) : (
                          <RxArrowTopRight className=" w-2 h-2 md:w-5 md:h-5 text-red-600" />
                        )}
                      </div>

                      <div>
                        {productName ? (
                          <>
                            <p className="font-medium text-sm md:text-base">
                              {productName}
                            </p>

                            {author && (
                              <p className="text-sm text-muted-foreground">
                                {author}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <p className="font-medium capitalize text-sm md:text-base">
                              {type}
                            </p>

                            {status && (
                              <div className="flex text-sm text-muted-foreground">
                                <span
                                  className={`capitalize ${
                                    isSuccessful
                                      ? "text-green-600"
                                      : "text-amber-600"
                                  }`}
                                >
                                  {status}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right side: amount + date */}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-right text-sm md:text-base">
                        {formatCurrency(amount)}
                      </span>
                      <span className="text-muted-foreground text-xs md:text-sm text-nowrap">
                        {date ? format(new Date(date), "MMM d, yyyy") : "N/A"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionsBlock;
