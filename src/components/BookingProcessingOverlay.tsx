export const BookingProcessingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 w-screen h-screen flex flex-col">
      <div className="flex flex-col text-center justify-center font-bold text-white text-3xl">
        <span>Placing</span> <span>Booking</span> <span>...</span>
      </div>
    </div>
  );
};
