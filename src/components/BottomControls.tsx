import { Separator } from "./Separator";

interface Props {
  bagsAmount: number;
  bagSinglePrice: number;
}

export const BottomControls: React.FC<Props> = ({
  bagsAmount,
  bagSinglePrice,
  children,
}) => {
  return (
    <div className="mt-auto">
      <Separator color="black" />
      <div className="mx-6 my-8 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-sm">
            {bagsAmount} {bagsAmount === 1 ? "bag" : "bags"}
          </div>
          <div className="font-bold text-xl">
            ${(bagSinglePrice * bagsAmount).toFixed(2)}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
