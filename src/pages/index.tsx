import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookingPlaceAndBags } from "../components/BookingPlaceAndBags";
import { Input } from "../components/Input";
import { Separator } from "../components/Separator";

enum Steps {
  "bags",
  "person",
  "card",
}

const StepsAmount = Object.keys(Steps).length;

const Home: NextPage = () => {
  const router = useRouter();
  const {
    place = "Bucharest",
    bags = 1,
    name = "",
    email = "",
  }: {
    place?: string;
    bags?: number;
    step?: string;
    name?: string;
    email?: string;
  } = router.query;

  const setAmountOfBags = (amount: number) => {
    router.push({
      pathname: "/",
      query: {
        ...router.query,
        bags: amount,
      },
    });
  };

  const [step, setStep] = useState<Steps>(Steps.bags);

  const amountOfBags = Number(bags);

  const goNextStep = () => {
    if (step < StepsAmount) setStep(step + 1);
  };

  // set value of the input to the query
  const changeForm = (key: string) => {
    return (newValue: string) => {
      router.replace({
        pathname: "/",
        query: {
          ...router.query,
          [key]: newValue,
        },
      });
    };
  };

  const [card, setCard] = useState("");
  const changeCard = (newValue: string) => {
    setCard(newValue);
  };

  const [paymentStatus, setPaymentStatus] = useState<
    "" | "processing" | "failed" | "success"
  >("");

  const [paymentRetries, setPaymentRetries] = useState(0);
  const processPayment = () => {
    console.log("process payment");
    setPaymentStatus("processing");
    if (paymentRetries < 3) {
      setTimeout(() => {
        console.log("payment retries", paymentRetries);
        setPaymentStatus("failed");
        setPaymentRetries(paymentRetries + 1);
      }, 3000);
    } else {
      setPaymentStatus("success");
    }
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      router.push({
        pathname: "/placed",
      });
    }
  }, [paymentStatus, router]);

  return (
    <>
      <div className="w-full max-w-md space-y-3 bg-white mx-auto">
        <BookingPlaceAndBags
          place={place}
          bags={amountOfBags}
          onBagsChange={setAmountOfBags}
        />
        <Separator />
        {step >= Steps.person && (
          <>
            <div className="mx-6">
              <div className="mt-6 font-medium">Personal Details:</div>
              {/* input form for name and email */}
              <div className="flex flex-column space-y-2">
                <Input
                  label="Name"
                  value={name}
                  onChange={changeForm("name")}
                />
                <Input
                  label="Email"
                  value={email}
                  onChange={changeForm("email")}
                />
              </div>
            </div>
            <Separator />
          </>
        )}

        {step >= Steps.card && (
          <div className="mx-6">
            <div className="mt-6 font-medium">Payment information:</div>
            {/* input form for card number */}
            <div className="flex flex-column space-y-2">
              <Input label="Card Number" value={card} onChange={changeCard} />
            </div>
          </div>
        )}

        {step <= Steps.card ? (
          <button
            className="rounded flex items-center bg-blue-500 m-2 px-4 py-4 text-white hover:bg-blue-600"
            onClick={goNextStep}
          >
            Next
          </button>
        ) : (
          <button
            className={`rounded flex items-cente m-2 px-4 py-4 text-white ${
              paymentStatus !== "failed"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            } ${card === "" && "opacity-50"}`}
            onClick={processPayment}
            disabled={card === ""}
          >
            {paymentStatus === "failed"
              ? "Retry"
              : paymentStatus === "processing"
              ? "Placing"
              : "Booking"}
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
