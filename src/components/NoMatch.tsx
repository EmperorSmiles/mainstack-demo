import { Button } from "./ui/button";
import { MdReceiptLong } from "react-icons/md";

interface Props {
  main?: string;
  subHead?: string;
  handleClearFilters: () => void;
}

export default function NoMatch({
  main = "No matching transaction found for the selected filter",
  subHead = "Change your filters to see more results, or add a new product.",
  handleClearFilters,
}: Props) {
  return (
    <div className="max-w-[370px] mx-auto my-4 w-full">
      <div className="rounded-full bg-gray-300 w-20 h-20 flex justify-center items-center">
        {/* <Image src={ReceiptIcon} alt="reciept icon" width={24} height={50} /> */}
        <MdReceiptLong className="w-10 h-10 " />
      </div>
      <div className="text-left">
        <h3 className="text-primary font-bold text-3xl leading-10 mb-3 mt-8">
          {main}
        </h3>
        <p className="text-gray-400 mb-6 leading-7">{subHead}</p>
      </div>
      <Button
        variant="secondary"
        onClick={() => handleClearFilters()}
        className="bg-gray-300"
      >
        Clear Filter
      </Button>
    </div>
  );
}
