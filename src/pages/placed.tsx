import type { NextPage } from "next";

const Placed: NextPage = () => {
  // display centered text in the middle of page bold
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center"> Booking Placed!</h1>
    </div>
  );
};

export default Placed;
