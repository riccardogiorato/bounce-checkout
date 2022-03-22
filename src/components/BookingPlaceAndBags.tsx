interface Props {
  place: React.ReactNode;
  bags: number;
  onBagsChange?: (bags: number) => void;
}

export const BookingPlaceAndBags: React.FC<Props> = ({
  place,
  bags,
  onBagsChange,
}) => {
  return (
    <div className="p-10">
      <p className="text-base text-black mb-2">Booking Storage at:</p>
      <p className="text-xl text-black font-bold mb-8">{place}</p>
      <div className="flex self-center justify-between">
        <p className="text-base text-black mb-2">Number of bags:</p>
        <button
          className="rounded shadow-md flex items-center bg-bluebounce-500 p-3 text-white w-[30px] h-[30px]"
          disabled={bags === 1}
          onClick={() => onBagsChange && bags > 1 && onBagsChange(bags - 1)}
        >
          -
        </button>
        <p className="block text-base text-black mx-6">{bags}</p>
        <button
          className="rounded shadow-md flex items-center bg-bluebounce-500 p-3 text-white w-[30px] h-[30px]"
          onClick={() => onBagsChange && onBagsChange(bags + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
