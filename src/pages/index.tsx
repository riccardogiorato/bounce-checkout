import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookingPlaceAndBags } from "../components/BookingPlaceAndBags";
import { BottomControls } from "../components/BottomControls";
import { FormSection } from "../components/FormSection";
import { Input } from "../components/Input";
import { BookingProcessingOverlay } from "../components/BookingProcessingOverlay";

const MIN_AMOUNT_OF_RETRIES = 1;

enum Steps {
  "bags",
  "person",
  "card",
}
const StepsAmount = Object.keys(Steps).length;

const pricePerBag = 5.9;

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
    name?: string;
    email?: string;
  } = router.query;

  const amountOfBags = Number(bags);

  // TODO if we want to make every step editable we could make an object
  // with all the steps that we filled in and that we can edit
  const [isEditingPerson, setIsEditingPerson] = useState(true);
  const [step, setStep] = useState<Steps>(Steps.bags);
  const goNextStep = () => {
    if (step < StepsAmount) {
      if (step === Steps.person) {
        setIsEditingPerson(false);
      }
      setStep(step + 1);
    }
  };

  const changeRouterKey = (key: string) => {
    return (newValue: string | number) => {
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
    "processing" | "failed" | "success"
  >();

  const [paymentRetries, setPaymentRetries] = useState(0);
  const processPayment = () => {
    setPaymentStatus("processing");
    if (paymentRetries < MIN_AMOUNT_OF_RETRIES) {
      setTimeout(() => {
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
      {paymentStatus === "processing" && <BookingProcessingOverlay />}
      <div className="w-full max-w-md h-full bg-white mx-auto flex flex-col">
        <BookingPlaceAndBags
          place={place}
          bags={amountOfBags}
          onBagsChange={changeRouterKey("bags")}
        />
        <FormSection
          title="Personal information"
          status={
            step >= Steps.person
              ? isEditingPerson
                ? "visible"
                : "completed"
              : "hidden"
          }
          onChangeClick={() => setIsEditingPerson(true)}
        >
          <Input label="Name" value={name} onChange={changeRouterKey("name")} />
          <Input
            label="Email"
            value={email}
            onChange={changeRouterKey("email")}
          />
        </FormSection>
        <FormSection
          title="Payment information"
          status={step >= Steps.card ? "visible" : "hidden"}
        >
          <Input label="Card Number" value={card} onChange={changeCard} />
        </FormSection>

        <BottomControls bagsAmount={amountOfBags} bagSinglePrice={pricePerBag}>
          {step < Steps.card ? (
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
                ? "..."
                : "Booking"}
            </button>
          )}
        </BottomControls>
      </div>
    </>
  );
};

export default Home;
